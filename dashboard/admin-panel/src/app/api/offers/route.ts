import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM custom_schema.offers ORDER BY id DESC");
    client.release();

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const client = await pool.connect();
    const result = await client.query("INSERT INTO custom_schema.offers (name) VALUES ($1) RETURNING id", [name]);
    client.release();

    return NextResponse.json({ message: "Offer created", id: result.rows[0].id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

