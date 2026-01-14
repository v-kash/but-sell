import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);
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

    // Basic validation
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
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11
      )
      RETURNING id;
    `;

    const values = [
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

    return NextResponse.json({
      success: true,
      employeeId: result.rows[0].id,
    });
  } catch (error) {
    console.error("Register Employee Error:", error);
    return NextResponse.json(
      { error: "Failed to register employee" },
      { status: 500 }
    );
  }
}
