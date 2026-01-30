// import { NextResponse } from "next/server";
// import pool from "@/lib/db";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     console.log(body);
//     const {
//       contact,
//       name,
//       area,
//       address,
//       district,
//       state,
//       pincode,
//       education,
//       workProfile,
//       experience,
//       resumeFiles,
//     } = body;

//     // Basic validation
//     if (
//       !contact ||
//       !name ||
//       !address ||
//       !district ||
//       !state ||
//       !pincode ||
//       !workProfile
//     ) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const query = `
//       INSERT INTO employees (
//         name,
//         contact,
//         area,
//         address,
//         district,
//         state,
//         pincode,
//         education,
//         work_profile,
//         experience,
//         resume_files
//       )
//       VALUES (
//         $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11
//       )
//       RETURNING id;
//     `;

//     const values = [
//       name,
//       contact,
//       area || "",
//       address,
//       district,
//       state,
//       pincode,
//       education || "",
//       workProfile,
//       experience || "",
//       JSON.stringify(resumeFiles || []),
//     ];

//     const result = await pool.query(query, values);

//     return NextResponse.json({
//       success: true,
//       employeeId: result.rows[0].id,
//     });
//   } catch (error) {
//     console.error("Register Employee Error:", error);
//     return NextResponse.json(
//       { error: "Failed to register employee" },
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
    // ✅ READ COOKIE (App Router style)
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

    const userId = decoded.id; // ✅ IMPORTANT

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

    // ✅ Validation
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

    // ✅ INCLUDE user_id
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
      RETURNING id;
    `;

    const values = [
      userId,                           // $1  ✅
      name,                             // $2
      contact,                          // $3
      area || "",                       // $4
      address,                          // $5
      district,                         // $6
      state,                            // $7
      pincode,                          // $8
      education || "",                  // $9
      workProfile,                     // $10
      experience || "",                // $11
      JSON.stringify(resumeFiles || [])// $12
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
