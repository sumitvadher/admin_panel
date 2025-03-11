import { NextResponse, NextRequest } from "next/server";
import { pool } from "@/lib/db";

// ✅ Fetch all affiliates
export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT id, name, api_key, postback_url, status, created_at 
       FROM custom_schema.affiliates ORDER BY id DESC`
    );
    client.release();

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching affiliates:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ✅ Create a new affiliate
export async function POST(req: Request) {
  try {
    const { name, api_key, postback_url, status } = await req.json();

    if (!name || !api_key) {
      return NextResponse.json({ error: "Affiliate name and API key are required" }, { status: 400 });
    }

    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO custom_schema.affiliates (name, api_key, postback_url, status) 
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [name, api_key, postback_url || null, status ?? true]
    );
    client.release();

    return NextResponse.json({ message: "Affiliate created successfully", id: result.rows[0].id }, { status: 201 });
  } catch (error) {
    console.error("❌ Error adding affiliate:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ✅ Delete an affiliate (Requires ID in request body)
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Affiliate ID is required" }, { status: 400 });
    }

    const client = await pool.connect();
    const result = await client.query("DELETE FROM custom_schema.affiliates WHERE id = $1 RETURNING id", [id]);
    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Affiliate not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Affiliate deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting affiliate:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

