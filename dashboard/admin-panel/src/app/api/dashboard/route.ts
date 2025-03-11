import { NextResponse } from "next/server";
import { Pool } from "pg";

// PostgreSQL Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

// ✅ Get Dashboard Stats
export async function GET() {
  try {
    const client = await pool.connect();

    const result = await client.query(`
      SELECT 
        (SELECT COUNT(*) FROM custom_schema.affiliates) AS total_affiliates,
        (SELECT COUNT(*) FROM custom_schema.offers) AS total_offers,
        (SELECT COUNT(*) FROM custom_schema.transactions) AS total_transactions,
        (SELECT COUNT(*) FROM custom_schema.transactions WHERE status = 'SUCCESS') AS successful_transactions
    `);

    client.release();
    return NextResponse.json(result.rows[0], { status: 200 });

  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

