// src/scripts/setupMeili.js
import { meiliClient } from "../lib/meili.js";

async function setup() {
  /* CREATE INDEXES */
  await meiliClient.createIndex("ads", { primaryKey: "id" }).catch(() => {});
  await meiliClient
    .createIndex("employees", { primaryKey: "id" })
    .catch(() => {});
  await meiliClient
    .createIndex("employers", { primaryKey: "id" })
    .catch(() => {});

  /* FILTERABLE FIELDS */
  await meiliClient
    .index("ads")
    .updateFilterableAttributes([
      "type",
      "pincode",
      "state",
      "district",
      "area",
      "taluka",
      "approval_status",
    ]);

  await meiliClient
    .index("employees")
    .updateFilterableAttributes([
      "pincode",
      "state",
      "district",
      "area",
      "taluka",
    ]);

  await meiliClient
    .index("employers")
    .updateFilterableAttributes([
      "pincode",
      "state",
      "district",
      "area",
      "taluka",
    ]);

  /* SEARCHABLE FIELDS (MATCH YOUR OLD SQL EXACTLY) */
  await meiliClient
    .index("ads")
    .updateSearchableAttributes([
      "detailed_description",
      "state",
      "district",
      "area",
      "taluka",
    ]);

  await meiliClient
    .index("employees")
    .updateSearchableAttributes([
      "work_profile",
      "state",
      "district",
      "area",
      "taluka",
    ]);

  await meiliClient
    .index("employers")
    .updateSearchableAttributes([
      "job_details",
      "state",
      "district",
      "area",
      "taluka",
    ]);

  await meiliClient.index("ads").updateTypoTolerance({
    disableOnAttributes: [],
  });

  await meiliClient.index("employees").updateTypoTolerance({
    disableOnAttributes: [],
  });

  await meiliClient.index("employers").updateTypoTolerance({
    disableOnAttributes: [],
  });

  await meiliClient
    .index("ads")
    .updateRankingRules([
      "words",
      "typo",
      "proximity",
      "attribute",
      "exactness",
      "sort",
    ]);

  await meiliClient
    .index("ads")
    .updateSortableAttributes([
      "is_recommended",
      "rating",
      "rating_count",
      "created_at",
    ]);



    await meiliClient.index("employees").updateSortableAttributes([
    "is_recommended",
    "created_at",
  ]);

  /* EMPLOYERS */
  await meiliClient.index("employers").updateSortableAttributes([
    "is_recommended",
    "created_at",
  ]);
  console.log("✅ Meilisearch setup complete");


    /* ADS */
  

  /* EMPLOYEES */
  
}

setup();
