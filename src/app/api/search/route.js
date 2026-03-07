// app/api/search/route.js

import { NextResponse } from "next/server";
import { meiliClient } from "@/lib/meili";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const entity = searchParams.get("entity");
    const pincode = searchParams.get("pincode");
    const locationRaw = searchParams.get("district");
    const location = locationRaw ? locationRaw.toLowerCase() : null;
    const keyword = searchParams.get("q");
    const type = searchParams.get("type");
    const page = parseInt(searchParams.get("page") || "1");

    if (!entity) {
      return NextResponse.json(
        { error: "Entity is required" },
        { status: 400 },
      );
    }

    const index = meiliClient.index(entity);

    /* BUILD FILTERS */
    let filters = [];

    if (entity === "ads") {
      filters.push(`approval_status = "approved"`);
    }
    // Ads type filter
    if (entity === "ads" && type) {
      filters.push(`type = "${type}"`);
    }

    // Pincode filter
    if (pincode) {
      filters.push(`pincode = "${pincode}"`);
    }

    // Location OR block
    // if (location) {
    //   filters.push(
    //     `(state = "${location}" OR district = "${location}" OR area = "${location}" OR taluka = "${location}")`,
    //   );
    // }

    const filterString = filters.length > 0 ? filters.join(" AND ") : undefined;

    const combinedQuery = [keyword, location].filter(Boolean).join(" ");

    // const results = await index.search(combinedQuery || "", {
    //   filter: filterString,
    //   limit: 20,
    //   offset: (page - 1) * 20,
    // });

    // const results = await index.search(combinedQuery || "", {
    //   filter: filterString,
    //   limit: 20,
    //   offset: (page - 1) * 20,
    //   sort: [
    //     "is_recommended:desc",
    //     "rating:desc",
    //     "rating_count:desc",
    //     "created_at:desc",
    //   ],
    // });

    const SORT_CONFIG = {
      ads: [
        "is_recommended:desc",
        "rating:desc",
        "rating_count:desc",
        "created_at:desc",
      ],
      employees: ["is_recommended:desc", "created_at:desc"],
      employers: ["is_recommended:desc", "created_at:desc"],
    };

    const results = await index.search(combinedQuery || "", {
      filter: filterString,
      limit: 20,
      offset: (page - 1) * 20,
      sort: SORT_CONFIG[entity] || [],
    });

    return NextResponse.json({
      success: true,
      count: results.hits.length,
      data: results.hits,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
