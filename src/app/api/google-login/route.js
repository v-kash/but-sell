import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req) {
  try {
    const { credential } = await req.json();

    // 1️⃣ Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;

    // 2️⃣ Check if user exists
    let result = await pool.query(
      "SELECT id, email FROM users WHERE email=$1",
      [email]
    );

    let user;

    if (result.rowCount === 0) {
      // 3️⃣ Create user if not exists
      const insert = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
        [email, null] // password null for Google users
      );

      user = insert.rows[0];
    } else {
      user = result.rows[0];
    }

    const isAdmin = user.email === "admin@buysellrs.com";

    // 4️⃣ Generate SAME JWT as your normal login
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({ success: true, isAdmin });

    // 5️⃣ Set SAME cookie structure
    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });

    return res;

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Google authentication failed" },
      { status: 401 }
    );
  }
}
