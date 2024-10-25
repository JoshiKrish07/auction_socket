import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const [rows] = await db.execute("SELECT * FROM auction_detail");

        if (rows.length === 0) {
            return NextResponse.json({ message: "auctions not found" }, { status: 404 });
        }

        return NextResponse.json({ data: rows }, { status: 200 });
    } catch (error) {
        console.log("error in auction_detail api call", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}