import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export async function POST(req) {
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

  await pool.query(
    "UPDATE ads SET is_recommended = $1 WHERE id = $2",
    [value, adId]
  );

  return Response.json({ success: true });
}
