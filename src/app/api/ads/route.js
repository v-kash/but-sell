import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      type,
      contact,
      name,
      address,
      area,
      taluka,
      district,
      state,
      pincode,
      allIndia,
      budget,
      shortDescription,
      detailedDescription,
      images,
      validityDays,
    } = body;

    // Basic validation
    if (!type || !contact || !address || !district || !state || !pincode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

 const query = `
INSERT INTO ads (
  type,
  title,
  short_description,
  detailed_description,
  budget,
  contact,
  address,
  area,
  taluka,
  district,
  state,
  pincode,
  all_india,
  images,
  validity_days,
  expires_at
)
VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8,
  $9, $10, $11, $12, $13, $14, $15,
  NOW() + make_interval(days => $15)
)
RETURNING id;
`;




const values = [
  type,                           // $1
  name || "",                     // $2
  shortDescription || "",         // $3
  detailedDescription || "",      // $4
  budget || null,                 // $5
  contact,                        // $6
  address,                        // $7
  area || null,                   // $8
  taluka || null,                 // $9
  district,                       // $10
  state,                          // $11
  pincode,                        // $12
  allIndia || false,              // $13
  JSON.stringify(images || []),   // $14
  parseInt(validityDays, 10) || 3 // $15
];


    const result = await pool.query(query, values);

    return NextResponse.json({
      success: true,
      adId: result.rows[0].id,
    });
  } catch (error) {
    console.error("Post Ad Error:", error);
    return NextResponse.json(
      { error: "Failed to post ad" },
      { status: 500 }
    );
  }
}
