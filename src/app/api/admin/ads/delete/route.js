// import { NextResponse } from "next/server";
// import pool from "@/lib/db";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

// export async function POST(req) {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const user = jwt.verify(token, process.env.JWT_SECRET);

//     if (!user.isAdmin) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     const { id } = await req.json();

//     await pool.query("DELETE FROM ads WHERE id=$1", [id]);

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     return NextResponse.json({ error: "Delete failed" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { meiliClient } from "@/lib/meili";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (!user.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await req.json();

    /* =========================
       1️⃣ Delete from PostgreSQL
    ========================== */
    await pool.query("DELETE FROM ads WHERE id=$1", [id]);

    /* =========================
       2️⃣ Delete from Meilisearch
    ========================== */
    const index = meiliClient.index("ads");
    await index.deleteDocument(id);

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}