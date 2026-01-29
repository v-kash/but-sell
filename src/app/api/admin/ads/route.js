import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export async function GET(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = jwt.verify(token, process.env.JWT_SECRET);

 if (!user.isAdmin) {
  return Response.json({ error: "Forbidden" }, { status: 403 });
}

  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q");
  const state = searchParams.get("state");
  const district = searchParams.get("district");
  const taluka = searchParams.get("taluka");
  const pincode = searchParams.get("pincode");

  const page = Number(searchParams.get("page") || 1);
  const limit = 20;
  const offset = (page - 1) * limit;

  let conditions = [];
  let values = [];
  let idx = 1;

  if (q) {
    conditions.push(`
      (
        title ILIKE $${idx}
        OR contact ILIKE $${idx}
      )
    `);
    values.push(`%${q}%`);
    idx++;
  }

  if (state) {
    conditions.push(`state ILIKE $${idx}`);
    values.push(`%${state}%`);
    idx++;
  }

  if (district) {
    conditions.push(`district ILIKE $${idx}`);
    values.push(`%${district}%`);
    idx++;
  }

  if (taluka) {
    conditions.push(`taluka ILIKE $${idx}`);
    values.push(`%${taluka}%`);
    idx++;
  }

  if (pincode) {
    conditions.push(`pincode = $${idx}`);
    values.push(pincode);
    idx++;
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const adsQuery = `
    SELECT *
    FROM ads
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  const countQuery = `
    SELECT COUNT(*) FROM ads ${whereClause}
  `;

  const ads = await pool.query(adsQuery, values);
  const count = await pool.query(countQuery, values);

  return Response.json({
    data: ads.rows,
    total: Number(count.rows[0].count),
    page,
    limit,
  });
}
