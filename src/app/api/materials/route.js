import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const [rows] = await db.execute("SELECT * FROM material");

        if (rows.length === 0) {
            return NextResponse.json({ message: "materials not found" }, { status: 404 });
        }

        return NextResponse.json({ data: rows }, { status: 200 });
    } catch (error) {
        console.log("error in material api call", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}