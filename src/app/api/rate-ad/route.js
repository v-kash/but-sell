import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { meiliClient } from "@/lib/meili";

export async function POST(req) {
  try {
    const { adId, rating } = await req.json();

    if (!adId || !rating) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // ✅ GET TOKEN FROM COOKIE
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let user;

    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    /* =========================
       1️⃣ Insert or update rating
    ========================== */
    await pool.query(
      `
      INSERT INTO ad_ratings (ad_id, user_id, rating)
      VALUES ($1, $2, $3)
      ON CONFLICT (ad_id, user_id)
      DO UPDATE SET rating = EXCLUDED.rating
      `,
      [adId, user.id, rating]
    );

    /* =========================
       2️⃣ Recalculate average
    ========================== */
    const result = await pool.query(
      `
      SELECT 
        AVG(rating)::numeric(10,2) as avg_rating,
        COUNT(*) as total
      FROM ad_ratings
      WHERE ad_id = $1
      `,
      [adId]
    );

    const avgRating = parseFloat(result.rows[0].avg_rating);
    const total = parseInt(result.rows[0].total);

    /* =========================
       3️⃣ Update ads table
    ========================== */
    await pool.query(
      `
      UPDATE ads
      SET rating = $1,
          rating_count = $2
      WHERE id = $3
      `,
      [avgRating, total, adId]
    );

    /* =========================
       4️⃣ 🔥 Sync Meilisearch
    ========================== */
    const index = meiliClient.index("ads");

    await index.updateDocuments([
      {
        id: adId,              // must match your indexed ID
        rating: avgRating,
        rating_count: total,
      },
    ]);

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Rating error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}