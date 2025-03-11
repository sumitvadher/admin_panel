import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

// ✅ Get Transaction by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await pool.connect();
    const { id } = params;
    const result = await client.query(`SELECT * FROM custom_schema.transactions WHERE id = $1`, [id]);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (err) {
    return NextResponse.json({ error: "Database error", details: err }, { status: 500 });
  }
}

