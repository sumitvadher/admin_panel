import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

// ✅ Get Reports with Filters
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    const affiliateID = url.searchParams.get("affiliateID");

    const client = await pool.connect();
    let query = `SELECT * FROM custom_schema.transactions WHERE created_at BETWEEN $1 AND $2`;
    let params = [startDate, endDate];

    if (affiliateID) {
      query += ` AND affiliate_id = $3`;
      params.push(affiliateID);
    }

    const result = await client.query(query, params);
    client.release();

    return NextResponse.json(result.rows, { status: 200 });

  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

