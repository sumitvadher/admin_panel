import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

// ✅ Get a single affiliate by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await pool.connect();
    const { id } = params;

    const result = await client.query("SELECT * FROM custom_schema.affiliates WHERE id = $1", [id]);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Affiliate not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching affiliate:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// ✅ Update affiliate
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, api_key, postback_url, status } = await req.json();

    if (!name || !api_key) {
      return NextResponse.json({ error: "Name and API key are required" }, { status: 400 });
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
      return NextResponse.json({ error: "Affiliate not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Affiliate updated successfully", id }, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating affiliate:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// ✅ Delete an affiliate by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const client = await pool.connect();
    const result = await client.query("DELETE FROM custom_schema.affiliates WHERE id = $1 RETURNING id", [id]);
    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Affiliate not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Affiliate deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting affiliate:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

