import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

// ✅ Get Single Affiliate
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await pool.connect();
    const { id } = params;
    const result = await client.query("SELECT * FROM custom_schema.affiliates WHERE id = $1", [id]);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Affiliate not found" }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (err) {
    return NextResponse.json({ error: "Database error", details: err }, { status: 500 });
  }
}

// ✅ Update Affiliate
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await pool.connect();
    const { id } = params;
    const { name, api_key, postback_url, status } = await req.json();

    const result = await client.query(
      "UPDATE custom_schema.affiliates SET name = $1, api_key = $2, postback_url = $3, status = $4 WHERE id = $5 RETURNING *",
      [name, api_key, postback_url, status, id]
    );

    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Affiliate not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Affiliate updated successfully", affiliate: result.rows[0] });
  } catch (err) {
    return NextResponse.json({ error: "Database error", details: err }, { status: 500 });
  }
}


// ✅ Delete Affiliate
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      const client = await pool.connect();
      const { id } = params;
  
      const result = await client.query("DELETE FROM custom_schema.affiliates WHERE id = $1 RETURNING *", [id]);
      client.release();
  
      if (result.rowCount === 0) {
        return NextResponse.json({ error: "Affiliate not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Affiliate deleted successfully" });
    } catch (err) {
      return NextResponse.json({ error: "Database error", details: err }, { status: 500 });
    }
  }

  
  