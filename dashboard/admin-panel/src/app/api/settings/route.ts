import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

// ✅ Get System Settings
export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM custom_schema.settings`);
    client.release();

    return NextResponse.json(result.rows[0], { status: 200 });

  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ✅ Update System Settings
export async function PUT(req: Request) {
  try {
    const { setting_name, setting_value } = await req.json();

    if (!setting_name || setting_value === undefined) {
      return NextResponse.json({ error: "Missing setting details" }, { status: 400 });
    }

    const client = await pool.connect();
    await client.query(
      `UPDATE custom_schema.settings SET setting_value = $1 WHERE setting_name = $2`,
      [setting_value, setting_name]
    );
    client.release();

    return NextResponse.json({ message: "Settings updated successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

