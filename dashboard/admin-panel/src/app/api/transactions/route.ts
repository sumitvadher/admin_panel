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

// ✅ Get All Transactions
export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT id, affiliate_id, offer_id, mobile_number, transaction_id, status, created_at, verified_at, failed_attempts 
       FROM custom_schema.transactions ORDER BY created_at DESC`
    );
    client.release();

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

