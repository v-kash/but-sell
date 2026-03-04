import { meiliClient } from "../lib/meili.js";
import pool from "../lib/db.js";

async function sync() {
  const ads = await pool.query("SELECT * FROM ads");
  await meiliClient.index("ads").addDocuments(ads.rows);

  const employees = await pool.query("SELECT * FROM employees");
  await meiliClient.index("employees").addDocuments(employees.rows);

  const employers = await pool.query("SELECT * FROM employers");
  await meiliClient.index("employers").addDocuments(employers.rows);

  console.log("Sync complete");
}

sync();
