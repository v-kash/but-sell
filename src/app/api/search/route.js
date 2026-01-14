import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const entity = searchParams.get("entity"); 
    const pincode = searchParams.get("pincode");
    const district = searchParams.get("district");
    const title = searchParams.get("q");
    const type = searchParams.get("type");

    if (!entity) {
      return NextResponse.json(
        { error: "Entity is required" },
        { status: 400 }
      );
    }

    if (!pincode && !district) {
      return NextResponse.json(
        { error: "Pincode or district is required" },
        { status: 400 }
      );
    }

    let sql = "";
    let values = [];
    let i = 1;

    /* ================= ADS ================= */
    if (entity === "ads") {
      if (!type) {
        return NextResponse.json(
          { error: "Ad type is required" },
          { status: 400 }
        );
      }

      sql = `SELECT * FROM ads WHERE type = $${i++}`;
      values.push(type);

      // STRICT PINCODE FIRST
      if (pincode) {
        sql += ` AND pincode = $${i++}`;
        values.push(pincode);
      } else if (district) {
        sql += ` AND district ILIKE $${i++}`;
        values.push(`%${district}%`);
      }

      // TITLE (optional)
      if (title) {
        sql += ` AND title ILIKE $${i++}`;
        values.push(`%${title}%`);
      }

      sql += ` ORDER BY created_at DESC LIMIT 50`;
    }

    /* =============== EMPLOYEES =============== */
    if (entity === "employees") {
      sql = `SELECT * FROM employees WHERE 1=1`;

      if (pincode) {
        sql += ` AND pincode = $${i++}`;
        values.push(pincode);
      } else if (district) {
        sql += ` AND district ILIKE $${i++}`;
        values.push(`%${district}%`);
      }

      if (title) {
        sql += ` AND work_profile ILIKE $${i++}`;
        values.push(`%${title}%`);
      }

      sql += ` ORDER BY created_at DESC LIMIT 50`;
    }

    /* =============== EMPLOYERS =============== */
    if (entity === "employers") {
      sql = `SELECT * FROM employers WHERE 1=1`;

      if (pincode) {
        sql += ` AND pincode = $${i++}`;
        values.push(pincode);
      } else if (district) {
        sql += ` AND district ILIKE $${i++}`;
        values.push(`%${district}%`);
      }

      if (title) {
        sql += ` AND job_title ILIKE $${i++}`;
        values.push(`%${title}%`);
      }

      sql += ` ORDER BY created_at DESC LIMIT 50`;
    }

    const result = await pool.query(sql, values);

    return NextResponse.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Search Error:", error);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}
