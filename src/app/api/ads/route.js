import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const cookieStore = await cookies(); // ✅ await is REQUIRED
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

    const userId = decoded.id; // ✅ THIS is what DB needs

    const body = await req.json();

    const upperCaseData = Object.fromEntries(
      Object.entries(body).map(([key, value]) => [
        key,
        typeof value === "string" ? value.toUpperCase() : value,
      ]),
    );

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
    } = upperCaseData;

    // Basic validation
    if (!type || !contact || !address || !district || !state || !pincode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const query = `
INSERT INTO ads (
user_id,
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
  $9, $10, $11, $12, $13, $14, $15, $16,
  NOW() + make_interval(days => $16)
)
RETURNING id;
`;

    const values = [
      userId, // $1  ✅ NEW
      type, // $2
      name || "", // $3
      shortDescription || "", // $4
      detailedDescription || "", // $5
      budget || null, // $6
      contact, // $7
      address, // $8
      area || null, // $9
      taluka || null, // $10
      district, // $11
      state, // $12
      pincode, // $13
      allIndia || false, // $14
      JSON.stringify(images || []), // $15
      parseInt(validityDays, 10) || 3, // $16
    ];

    const result = await pool.query(query, values);

    return NextResponse.json({
      success: true,
      adId: result.rows[0].id,
    });
  } catch (error) {
    console.error("Post Ad Error:", error);
    return NextResponse.json({ error: "Failed to post ad" }, { status: 500 });
  }
}
