import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, newPassword, confirmPassword } = await req.json();

  if (!email || !newPassword || !confirmPassword) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json(
      { error: "Passwords do not match" },
      { status: 400 }
    );
  }

  if (newPassword.length < 6) {
    return NextResponse.json(
      { error: "Password must be at least 6 characters" },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  const result = await pool.query(
    "UPDATE users SET password=$1 WHERE email=$2",
    [hashed, email]
  );

  if (result.rowCount === 0) {
    return NextResponse.json(
      { error: "Email not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
