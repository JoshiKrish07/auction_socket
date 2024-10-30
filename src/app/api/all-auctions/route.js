import db from "@/utils/db";
import { NextResponse } from "next/server";
import cors from "@/lib/cors";

// Ensure Next.js treats this route as dynamic
export const dynamic = 'force-dynamic';

export async function GET(req) {
  // Handle CORS headers
  const corsHeaders = cors(req);

  // Return early for preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const [rows] = await db.execute("SELECT * FROM auction_detail");

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "auctions not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { data: rows },
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error in auction_detail API call:", error);
    return NextResponse.json(
      { message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}