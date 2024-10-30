import db from "@/utils/db";
import { NextResponse } from 'next/server';
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
    
    const { searchParams } = new URL(req.url);
    const auctId = searchParams.get('auct_id'); 

    try {
        
        if(auctId) {
            
            const [rows] = await db.execute('SELECT * FROM auction_detail WHERE auct_id = ?', [auctId]); 
            if (rows.length === 0) {
                return NextResponse.json({ message: 'Auction not found' }, { status: 404, headers: corsHeaders });
            }
            return NextResponse.json({ data: rows[0] }, 
                {
                    status: 200,
                    headers: {
                      ...corsHeaders,
                      "Cache-Control": "no-store, max-age=0, must-revalidate",
                    },
                  }
            );

        } else {
            const [rows] = await db.execute('SELECT * FROM auction_detail WHERE auct_status = ?', ['UPCOMING']);

            if (rows.length === 0) {
                return NextResponse.json({ message: 'No upcoming auctions found' }, { status: 404, headers: corsHeaders });
            }

            return NextResponse.json({ data: rows }, 
                {
                    status: 200,
                    headers: {
                      ...corsHeaders,
                      "Cache-Control": "no-store, max-age=0, must-revalidate",
                    },
                  }
            );
        }

    } catch (error) {
        console.log("error in fetching live auctions", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }

} 