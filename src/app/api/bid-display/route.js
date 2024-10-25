import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        
        const [result] = await db.execute("SELECT * FROM `bid_display`");

        return NextResponse.json({data: result}, {status: 200});
    } catch (error) {
        console.error('Error fetching bid details:', error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}
