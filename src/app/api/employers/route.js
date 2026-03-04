import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { meiliClient } from "@/lib/meili";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;

    const body = await req.json();
    const {
      contact,
      companyName,
      address,
      area,
      taluka,
      district,
      state,
      pincode,
      jobTitle,
      jobDetails,
      companyImage,
    } = body;

    if (
      !companyName ||
      !contact ||
      !address ||
      !district ||
      !state ||
      !pincode
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO employers (
        user_id,
        company_name,
        contact,
        address,
        area,
        taluka,
        district,
        state,
        pincode,
        job_title,
        job_details,
        company_image
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING *;
    `;

    const values = [
      userId,
      companyName,
      contact,
      address,
      area || "",
      taluka || "",
      district,
      state,
      pincode,
      jobTitle || "",
      jobDetails || "",
      companyImage || null,
    ];

    const result = await pool.query(query, values);
    const newEmployer = result.rows[0];

    /* =========================
       🔥 SYNC TO MEILISEARCH
    ========================== */

    const index = meiliClient.index("employers");

    await index.addDocuments([
      {
        id: newEmployer.id,
        user_id: newEmployer.user_id,
        company_name: newEmployer.company_name,
        contact: newEmployer.contact,
        address: newEmployer.address,
        area: newEmployer.area,
        taluka: newEmployer.taluka,
        district: newEmployer.district,
        state: newEmployer.state,
        pincode: newEmployer.pincode,
        job_title: newEmployer.job_title,
        job_details: newEmployer.job_details,
        company_image: newEmployer.company_image,
        created_at: newEmployer.created_at,
      },
    ]);

    return NextResponse.json({
      success: true,
      employerId: newEmployer.id,
    });

  } catch (error) {
    console.error("Register Employer Error:", error);
    return NextResponse.json(
      { error: "Failed to register employer" },
      { status: 500 }
    );
  }
}