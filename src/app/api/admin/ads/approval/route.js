import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";
import { meiliClient } from "@/lib/meili";

export async function POST(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = jwt.verify(token, process.env.JWT_SECRET);

  if (!user.isAdmin) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const { adId, action } = await req.json();

  if (!adId || !action) {
    return Response.json({ error: "Missing data" }, { status: 400 });
  }

  let approvalStatus = action === "approve" ? "approved" : "rejected";

  const result = await pool.query(
    `
  UPDATE ads
  SET approval_status = $1::varchar,
      payment_status = CASE
        WHEN $1::varchar = 'approved' THEN 'verified'
        ELSE payment_status
      END
  WHERE id = $2
  RETURNING *;
  `,
    [approvalStatus, adId],
  );

  const updatedAd = result.rows[0];

  const index = meiliClient.index("ads"); // define once

  if (approvalStatus === "approved") {
    await index.addDocuments([updatedAd]);
  }

  if (approvalStatus === "rejected") {
    await index.deleteDocument(updatedAd.id);
  }

  return Response.json({ success: true });
}
