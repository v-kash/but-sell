import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashed]
    );

    const user = result.rows[0];

    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const res = NextResponse.json({ success: true });
    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });

    return res;
  } catch (err) {
    if (err.code === "23505") {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
