import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      contact,
      companyName,
      address,
      district,
      state,
      pincode,
      jobTitle,
      jobDetails,
      companyImage, // S3 URL
    } = body;

    // Basic validation
    if (
      !contact ||
      !companyName ||
      !address ||
      !district ||
      !state ||
      !pincode ||
      !jobTitle
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO employers (
        company_name,
        contact,
        address,
        district,
        state,
        pincode,
        job_title,
        job_details,
        company_image
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING id;
    `;

    const values = [
      companyName,
      contact,
      address,
      district,
      state,
      pincode,
      jobTitle,
      jobDetails || "",
      companyImage || null,
    ];

    const result = await pool.query(query, values);

    return NextResponse.json({
      success: true,
      employerId: result.rows[0].id,
    });
  } catch (error) {
    console.error("Register Employer Error:", error);
    return NextResponse.json(
      { error: "Failed to register employer" },
      { status: 500 }
    );
  }
}
