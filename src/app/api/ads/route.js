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
  subscriptionPlan,
} = upperCaseData;

   if (!type || !contact || !address || !district || !state || !pincode || !subscriptionPlan) {
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
    subscription_plan,
    payment_status
  )
  VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8,
    $9, $10, $11, $12, $13, $14, $15, $16, $17
  )
  RETURNING *;
`;

    const values = [
  userId,
  type,
  name || "",
  shortDescription || "",
  detailedDescription || "",
  budget || null,
  contact,
  address,
  area || null,
  taluka || null,
  district,
  state,
  pincode,
  allIndia || false,
  JSON.stringify(images || []),
  subscriptionPlan,   // ✅ NEW
  "pending",          // ✅ payment_status
];
    const result = await pool.query(query, values);
    const newAd = result.rows[0];

    /* =========================
       🔥 ADD TO MEILISEARCH
    ========================== */

    const index = meiliClient.index("ads");

    await index.addDocuments([
  {
    id: newAd.id,
    type: newAd.type,
    title: newAd.title,
    short_description: newAd.short_description,
    detailed_description: newAd.detailed_description,
    budget: newAd.budget,
    contact: newAd.contact,
    address: newAd.address,
    area: newAd.area,
    taluka: newAd.taluka,
    district: newAd.district,
    state: newAd.state,
    pincode: newAd.pincode,
    all_india: newAd.all_india,
    images: newAd.images,
    rating: newAd.rating || 0,
    rating_count: newAd.rating_count || 0,
    is_recommended: newAd.is_recommended || false,
    created_at: newAd.created_at,
    approval_status: newAd.approval_status, // ✅ ADD THIS
  },
]);

    return NextResponse.json({
      success: true,
      adId: newAd.id,
    });

  } catch (error) {
    console.error("Post Ad Error:", error);
    return NextResponse.json({ error: "Failed to post ad" }, { status: 500 });
  }
}