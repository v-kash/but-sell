// import { NextResponse } from "next/server";
// import pool from "@/lib/db";

// export async function POST(req) {
//   try {
//     const body = await req.json();

//     const {
//       contact,
//       companyName,
//       address,
//       area,
//       taluka,
//       district,
//       state,
//       pincode,
//       jobTitle,
//       jobDetails,
//       companyImage, // S3 URL
//     } = body;

//     const query = `
//       INSERT INTO employers (
//         company_name,
//         contact,
//         address,
//         area,
//         taluka,
//         district,
//         state,
//         pincode,
//         job_title,
//         job_details,
//         company_image
//       )
//       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
//       RETURNING id;
//     `;

//     const values = [
//       companyName,
//       contact,
//       address,
//       area,
//       taluka,
//       district,
//       state,
//       pincode,
//       jobTitle || "",
//       jobDetails || "",
//       companyImage || null,
//     ];

//     const result = await pool.query(query, values);

//     return NextResponse.json({
//       success: true,
//       employerId: result.rows[0].id,
//     });
//   } catch (error) {
//     console.error("Register Employer Error:", error);
//     return NextResponse.json(
//       { error: "Failed to register employer" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    // ✅ AUTH: read token from httpOnly cookie
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

    const userId = decoded.id; // ✅ IMPORTANT

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
      companyImage, // S3 URL
    } = body;

    // ✅ Basic validation
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
        { status: 400 },
      );
    }

    // ✅ INCLUDE user_id
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
      RETURNING id;
    `;

    const values = [
      userId, // $1  ✅
      companyName, // $2
      contact, // $3
      address, // $4
      area || "", // $5
      taluka || "", // $6
      district, // $7
      state, // $8
      pincode, // $9
      jobTitle || "", // $10
      jobDetails || "", // $11
      companyImage || null, // $12
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
      { status: 500 },
    );
  }
}
