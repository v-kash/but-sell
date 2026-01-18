import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const entity = searchParams.get("entity"); // ads | employees | employers
    const pincode = searchParams.get("pincode");
    const location = searchParams.get("district"); // free-text location
    const keyword = searchParams.get("q"); // description / requirement
    const type = searchParams.get("type"); // ads only

    if (!entity) {
      return NextResponse.json(
        { error: "Entity is required" },
        { status: 400 }
      );
    }

    if (!pincode && !location && !keyword) {
      return NextResponse.json(
        { error: "At least one search parameter is required" },
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

      const conditions = [];

      // PINCODE
      if (pincode) {
        conditions.push(`pincode = $${i}`);
        values.push(pincode);
        i++;
      }

      // LOCATION (state / district / area / taluka)
      if (location) {
        conditions.push(`
          (
            state ILIKE $${i}
            OR district ILIKE $${i}
            OR area ILIKE $${i}
            OR taluka ILIKE $${i}
          )
        `);
        values.push(`%${location}%`);
        i++;
      }

      // KEYWORD (title + detailed_description)
      if (keyword) {
        conditions.push(`
          (
            title ILIKE $${i}
            OR detailed_description ILIKE $${i}
          )
        `);
        values.push(`%${keyword}%`);
        i++;
      }

      if (conditions.length > 0) {
        sql += ` AND (${conditions.join(" OR ")})`;
      }

      sql += ` ORDER BY created_at DESC LIMIT 50`;
    }

    /* =============== EMPLOYEES =============== */
    if (entity === "employees") {
      sql = `SELECT * FROM employees WHERE 1=1`;

      const conditions = [];

      if (pincode) {
        conditions.push(`pincode = $${i}`);
        values.push(pincode);
        i++;
      }

      if (location) {
        conditions.push(`
          (
            state ILIKE $${i}
            OR district ILIKE $${i}
            OR area ILIKE $${i}
            OR taluka ILIKE $${i}
          )
        `);
        values.push(`%${location}%`);
        i++;
      }

      if (keyword) {
        conditions.push(`work_profile ILIKE $${i}`);
        values.push(`%${keyword}%`);
        i++;
      }

      if (conditions.length > 0) {
        sql += ` AND (${conditions.join(" OR ")})`;
      }

      sql += ` ORDER BY created_at DESC LIMIT 50`;
    }

    /* =============== EMPLOYERS =============== */
    if (entity === "employers") {
      sql = `SELECT * FROM employers WHERE 1=1`;

      const conditions = [];

      // PINCODE
      if (pincode) {
        conditions.push(`pincode = $${i}`);
        values.push(pincode);
        i++;
      }

      // LOCATION
      if (location) {
        conditions.push(`
          (
            state ILIKE $${i}
            OR district ILIKE $${i}
            OR area ILIKE $${i}
            OR taluka ILIKE $${i}
          )
        `);
        values.push(`%${location}%`);
        i++;
      }

      // 🔥 KEYWORD MATCHES job_details (YOUR REQUIREMENT)
      if (keyword) {
        conditions.push(`job_details ILIKE $${i}`);
        values.push(`%${keyword}%`);
        i++;
      }

      if (conditions.length > 0) {
        sql += ` AND (${conditions.join(" OR ")})`;
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
