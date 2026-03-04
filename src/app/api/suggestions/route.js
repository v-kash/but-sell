// import { NextResponse } from "next/server";
// import pool from "@/lib/db";

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const q = searchParams.get("q");

//     if (!q || q.length < 2) {
//       return NextResponse.json([]);
//     }

//     const sql = `
//       (
//         SELECT DISTINCT detailed_description AS value
//         FROM ads
//         WHERE detailed_description ILIKE $1
//         LIMIT 5
//       )
//       UNION
//       (
//         SELECT DISTINCT work_profile AS value
//         FROM employees
//         WHERE work_profile ILIKE $1
//         LIMIT 5
//       )
//       UNION
//       (
//         SELECT DISTINCT job_details AS value
//         FROM employers
//         WHERE job_details ILIKE $1
//         LIMIT 5
//       )
//       LIMIT 10;
//     `;

//     const result = await pool.query(sql, [`%${q}%`]);

//     return NextResponse.json(result.rows.map((r) => r.value));
//   } catch (err) {
//     console.error("Suggestion error", err);
//     return NextResponse.json([]);
//   }
// }

// app/api/suggestions/route.js

import { NextResponse } from "next/server";
import { meiliClient } from "@/lib/meili";

function extractSmartSuggestions(hits, query) {
  const suggestions = new Set();
  const lowerQuery = query.toLowerCase();

  hits.forEach((hit) => {
    const text =
      hit.detailed_description || hit.work_profile || hit.job_details;

    if (!text) return;

    const words = text.split(/[\s,.!?]+/);

    words.forEach((word, index) => {
      if (word.toLowerCase().includes(lowerQuery)) {
        // Take 2 words around match
        const phrase = words.slice(Math.max(0, index - 1), index + 2).join(" ");

        suggestions.add(phrase);
      }
    });
  });

  return Array.from(suggestions).slice(0, 6);
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    const entity = searchParams.get("entity") || "ads";

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    const index = meiliClient.index(entity);

    const results = await index.search(query, {
      limit: 10,
    });

    const smartSuggestions = extractSmartSuggestions(results.hits, query);

    return NextResponse.json(smartSuggestions);
  } catch (error) {
    console.error("Suggestion error:", error);
    return NextResponse.json([]);
  }
}
