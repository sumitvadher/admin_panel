import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

// ✅ Fetch All Mappings
export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT sm.id, sm.smart_offer_id, sm.affiliate_id, sm.offer_id, 
             a.name AS affiliate_name, o.name AS offer_name
      FROM custom_schema.smart_offer_mapping sm
      LEFT JOIN custom_schema.affiliates a ON sm.affiliate_id = a.id
      LEFT JOIN custom_schema.offers o ON sm.offer_id = o.id
      ORDER BY sm.id DESC
    `);

    client.release();
    return NextResponse.json(result.rows, { status: 200 });

  } catch (error) {
    console.error("Error fetching mappings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ✅ Create a New Mapping
export async function POST(req: Request) {
  try {
    const { smart_offer_id, affiliate_id, offer_id } = await req.json();

    if (!smart_offer_id || !affiliate_id || !offer_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const client = await pool.connect();
    const result = await client.query(`
      INSERT INTO custom_schema.smart_offer_mapping (smart_offer_id, affiliate_id, offer_id)
      VALUES ($1, $2, $3) RETURNING id
    `, [smart_offer_id, affiliate_id, offer_id]);

    client.release();
    return NextResponse.json({ message: "Mapping created", id: result.rows[0].id }, { status: 201 });

  } catch (error) {
    console.error("Error adding mapping:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

