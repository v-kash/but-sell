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
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const userId = decoded.id;

    const body = await req.json();
    const {
      contact,
      name,
      area,
      address,
      district,
      state,
      pincode,
      education,
      workProfile,
      experience,
      resumeFiles,
    } = body;

    if (
      !contact ||
      !name ||
      !address ||
      !district ||
      !state ||
      !pincode ||
      !workProfile
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO employees (
        user_id,
        name,
        contact,
        area,
        address,
        district,
        state,
        pincode,
        education,
        work_profile,
        experience,
        resume_files
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12
      )
      RETURNING *;
    `;

    const values = [
      userId,
      name,
      contact,
      area || "",
      address,
      district,
      state,
      pincode,
      education || "",
      workProfile,
      experience || "",
      JSON.stringify(resumeFiles || []),
    ];

    const result = await pool.query(query, values);
    const newEmployee = result.rows[0];

    /* =========================
       🔥 SYNC TO MEILISEARCH
    ========================== */

    const index = meiliClient.index("employees");

    await index.addDocuments([
      {
        id: newEmployee.id,
        user_id: newEmployee.user_id,
        name: newEmployee.name,
        contact: newEmployee.contact,
        area: newEmployee.area,
        address: newEmployee.address,
        district: newEmployee.district,
        state: newEmployee.state,
        pincode: newEmployee.pincode,
        education: newEmployee.education,
        work_profile: newEmployee.work_profile,
        experience: newEmployee.experience,
        resume_files: newEmployee.resume_files,
        created_at: newEmployee.created_at,
      },
    ]);

    return NextResponse.json({
      success: true,
      employeeId: newEmployee.id,
    });

  } catch (error) {
    console.error("Register Employee Error:", error);
    return NextResponse.json(
      { error: "Failed to register employee" },
      { status: 500 }
    );
  }
}