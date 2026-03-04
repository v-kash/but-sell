// import { NextResponse } from "next/server";
// import pool from "@/lib/db"; // your pg pool

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const page = parseInt(searchParams.get("page")) || 1;
//     const limit = 12;
//     const offset = (page - 1) * limit;

//     const query = `
//       SELECT *,
//       (
//         CASE WHEN is_recommended = true THEN 50 ELSE 0 END
//         +
//         (rating * 10)
//         +
//         (rating_count * 2)
//         +
//         CASE
//           WHEN created_at >= NOW() - INTERVAL '3 days' THEN 20
//           WHEN created_at >= NOW() - INTERVAL '7 days' THEN 10
//           WHEN created_at >= NOW() - INTERVAL '30 days' THEN 5
//           ELSE 0
//         END
//       ) AS score
//       FROM ads
//       WHERE approval_status = 'approved'
//       AND (expires_at IS NULL OR expires_at > NOW())
//       ORDER BY score DESC
//       LIMIT $1 OFFSET $2
//     `;

//     const { rows } = await pool.query(query, [limit, offset]);

//     return NextResponse.json({
//       success: true,
//       page,
//       count: rows.length,
//       data: rows,
//     });
//   } catch (error) {
//     console.error("Home listings error:", error);
//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import pool from "@/lib/db"; // your pg connection

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;

    const limit = 12;
    const offset = (page - 1) * limit;

    const query = `
      SELECT *
      FROM ads
      WHERE approval_status = 'approved'
      
      ORDER BY 
        is_recommended DESC,
        rating DESC,
        created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const { rows } = await pool.query(query, [limit, offset]);

    return NextResponse.json({
      success: true,
      page,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error("Home listings error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
