import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = jwt.verify(token, process.env.JWT_SECRET);

  const ads = await pool.query(
    "SELECT * FROM ads WHERE user_id = $1 ORDER BY created_at DESC",
    [user.id]
  );

  const employees = await pool.query(
    "SELECT * FROM employees WHERE user_id = $1",
    [user.id]
  );

  const employers = await pool.query(
    "SELECT * FROM employers WHERE user_id = $1",
    [user.id]
  );

  return Response.json({
    ads: ads.rows,
    employees: employees.rows,
    employers: employers.rows,
  });
}
