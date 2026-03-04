// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import pool from "@/lib/db";

// export async function POST(req) {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   if (!token) {
//     return Response.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const user = jwt.verify(token, process.env.JWT_SECRET);

//   if (user.email !== "admin@buysellrs.com") {
//     return Response.json({ error: "Forbidden" }, { status: 403 });
//   }

//   const { adId, value } = await req.json();

//   await pool.query(
//     "UPDATE ads SET is_recommended = $1 WHERE id = $2",
//     [value, adId]
//   );

//   return Response.json({ success: true });
// }


import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";
import { meiliClient } from "@/lib/meili";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (user.email !== "admin@buysellrs.com") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const { adId, value } = await req.json();

    /* =========================
       1️⃣ Update PostgreSQL
    ========================== */
    await pool.query(
      "UPDATE ads SET is_recommended = $1 WHERE id = $2",
      [value, adId]
    );

    /* =========================
       2️⃣ Sync Meilisearch
    ========================== */
    const index = meiliClient.index("ads");

    await index.updateDocuments([
      {
        id: adId,
        is_recommended: value,
      },
    ]);

    return Response.json({ success: true });

  } catch (error) {
    console.error("Recommend toggle error:", error);
    return Response.json(
      { error: "Failed to update recommendation" },
      { status: 500 }
    );
  }
}