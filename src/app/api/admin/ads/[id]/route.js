// import { NextResponse } from "next/server";
// import pool from "@/lib/db";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

// export async function PUT(req, context) {
//   try {
//     const { id } = await context.params;  // ✅ FIX

//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (!decoded.isAdmin) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     const body = await req.json();

//     const {
//       type,
//       contact,
//       name,
//       address,
//       area,
//       taluka,
//       district,
//       state,
//       pincode,
//       allIndia,
//       budget,
//       detailedDescription,
//       validityDays,
//       rating,
//     } = body;

//     await pool.query(
//       `
//       UPDATE ads SET
//         type=$1,
//         title=$2,
//         contact=$3,
//         address=$4,
//         area=$5,
//         taluka=$6,
//         district=$7,
//         state=$8,
//         pincode=$9,
//         all_india=$10,
//         budget=$11,
//         detailed_description=$12,
//         validity_days=$13,
//         rating=$14
//       WHERE id=$15
//       `,
//       [
//         type,
//         name,
//         contact,
//         address,
//         area,
//         taluka,
//         district,
//         state,
//         pincode,
//         allIndia,
//         budget,
//         detailedDescription,
//         validityDays,
//         rating,
//         id,
//       ]
//     );

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Update failed" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { meiliClient } from "@/lib/meili";

export async function PUT(req, context) {
  try {
    const { id } = await context.params; // no need for await here

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

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
      detailedDescription,

      rating,
    } = body;

    /* =========================
       1️⃣ Update PostgreSQL
    ========================== */
    await pool.query(
      `
  UPDATE ads SET
    type=$1,
    contact=$2,
    title=$3,
    address=$4,
    area=$5,
    taluka=$6,
    district=$7,
    state=$8,
    pincode=$9,
    all_india=$10,
    budget=$11,
    detailed_description=$12,
    rating=$13
  WHERE id=$14
  `,
      [
        type,
        contact, // correct
        name, // correct
        address,
        area,
        taluka,
        district,
        state,
        pincode,
        allIndia,
        budget,
        detailedDescription,
        rating,
        id,
      ],
    );

    /* =========================
       2️⃣ Fetch Updated Row
    ========================== */
    const updated = await pool.query(`SELECT * FROM ads WHERE id = $1`, [id]);

    const updatedAd = updated.rows[0];

    /* =========================
       3️⃣ Sync Meilisearch
    ========================== */
    const index = meiliClient.index("ads");

    await index.updateDocuments([
      {
        id: updatedAd.id,
        type: updatedAd.type,
        title: updatedAd.title,
        short_description: updatedAd.short_description,
        detailed_description: updatedAd.detailed_description,
        budget: updatedAd.budget,
        contact: updatedAd.contact,
        address: updatedAd.address,
        area: updatedAd.area,
        taluka: updatedAd.taluka,
        district: updatedAd.district,
        state: updatedAd.state,
        pincode: updatedAd.pincode,
        all_india: updatedAd.all_india,
        rating: updatedAd.rating,
        rating_count: updatedAd.rating_count,
        is_recommended: updatedAd.is_recommended,
        created_at: updatedAd.created_at,
      },
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
