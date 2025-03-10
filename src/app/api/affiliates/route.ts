import { NextResponse } from "next/server";
import { Pool } from "pg";

// PostgreSQL Database Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT id, name, api_key, postback_url, status, created_at FROM custom_schema.affiliates ORDER BY id DESC`
    );
    client.release();

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching affiliates:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, api_key, postback_url, status } = await req.json();

    if (!name || !api_key) {
      return NextResponse.json(
        { error: "Affiliate name and API key are required" },
        { status: 400 }
      );
    }

    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO custom_schema.affiliates (name, api_key, postback_url, status) 
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [name, api_key, postback_url || null, status ?? true]
    );
    client.release();

    return NextResponse.json(
      { message: "Affiliate created successfully", id: result.rows[0].id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding affiliate:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name, api_key, postback_url, status } = await req.json();

    if (!id || !name || !api_key) {
      return NextResponse.json(
        { error: "Affiliate ID, name, and API key are required" },
        { status: 400 }
      );
    }

    const client = await pool.connect();
    const result = await client.query(
      `UPDATE custom_schema.affiliates 
       SET name = $1, api_key = $2, postback_url = $3, status = $4
       WHERE id = $5 RETURNING id`,
      [name, api_key, postback_url || null, status ?? true, id]
    );
    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Affiliate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Affiliate updated successfully", id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating affiliate:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

