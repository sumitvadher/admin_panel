import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM custom_schema.offers WHERE id = $1", [params.id]);
    client.release();

    if (result.rows.length === 0) return NextResponse.json({ error: "Offer not found" }, { status: 404 });

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

