import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, password } = await req.json();

  const result = await pool.query(
    "SELECT id, email, password FROM users WHERE email=$1",
    [email],
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const user = result.rows[0];
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isAdmin = user.email === "admin@buysellrs.com";

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  const res = NextResponse.json({ success: true, isAdmin });
  res.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });

  return res;
}
