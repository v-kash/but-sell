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
    district,
    state,
    pincode,
    all_india,
    images,
    validity_days,
    expires_at
  )
  VALUES (
    $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,
    NOW() + make_interval(days => $13)
  )
  RETURNING id;
`;



const values = [
  type,                         // $1
  name || "",                   // $2
  shortDescription || "",       // $3
  detailedDescription || "",    // $4
  budget || null,               // $5
  contact,                      // $6
  address,                      // $7
  district,                     // $8
  state,                        // $9
  pincode,                      // $10
  allIndia || false,            // $11
  JSON.stringify(images || []), // $12
  parseInt(validityDays, 10) || 3, // $13 (INTEGER ONLY)
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
