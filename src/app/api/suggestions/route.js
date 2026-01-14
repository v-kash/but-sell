import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q || q.length < 2) {
      return NextResponse.json([]);
    }

    const sql = `
      (
        SELECT DISTINCT title AS value
        FROM ads
        WHERE title ILIKE $1
        LIMIT 5
      )
      UNION
      (
        SELECT DISTINCT work_profile AS value
        FROM employees
        WHERE work_profile ILIKE $1
        LIMIT 5
      )
      UNION
      (
        SELECT DISTINCT job_title AS value
        FROM employers
        WHERE job_title ILIKE $1
        LIMIT 5
      )
      LIMIT 10;
    `;

    const result = await pool.query(sql, [`%${q}%`]);

    return NextResponse.json(result.rows.map(r => r.value));
  } catch (err) {
    console.error("Suggestion error", err);
    return NextResponse.json([]);
  }
}
