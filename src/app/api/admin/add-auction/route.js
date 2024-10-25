import db from "@/utils/db";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import cors from "@/lib/cors";
import { verifyAdmin } from "@/utils/verifyAdmin";

// Create the uploads directory path
const uploadsDir = path.join(process.cwd(), "public/auction_image");
console.log("====>uploadsDir===>", uploadsDir);
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

export async function POST(req) {

    // // Handle CORS
    // const corsHeaders = cors(req);

    // // If it's an OPTIONS request, return early
    // if (req.method === 'OPTIONS') {
    //     return new Response(null, { status: 204, headers: corsHeaders });
    // }

    try {
        const formData = await req.formData();

        const token = req.headers.get("authorization")?.split(" ")[1];
        if (!token) {
            return new NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
        }

        let admin;
        try {
            admin = verifyAdmin(token);
        } catch (err) {
            return new NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
        }

        console.log("=====admin=====>", admin);

        const auction_name = formData.get("auction_name");
        const auct_code = formData.get("auct_code");
        const auct_location = formData.get("auct_location");
        const auct_detail = formData.get("auct_detail");
        const auct_start_date = formData.get("auct_start_date");
        const auct_end_date = formData.get("auct_end_date");
        const auct_status = formData.get("auct_status");

        // Extract file
        const auct_image = formData.get("auct_image");

        // if auction already added
        const [existingAuction] = await db.execute(
          "SELECT * FROM auction_detail WHERE auct_code = ?",
          [auct_code]
        );

        if (existingAuction.length > 0) {
          return NextResponse.json({ message: "Auction with this code already added"}, {status: 409});
        }
    
        let imagePath = null;

        if (auct_image && typeof auct_image === "object" && auct_image.name) {

            const imageFileName = `${Date.now()}-${auct_image.name}`; // To ensure unique names
            imagePath = path.join(uploadsDir, imageFileName);

            const buffer = await auct_image.arrayBuffer();
            await fs.promises.writeFile(imagePath, Buffer.from(buffer));
            
            // Save only the relative path to the image
            imagePath = `/auction_image/${imageFileName}`;
        }

          const valuesToInsert = [
            auct_code,
            auction_name.toUpperCase(),
            auct_detail,
            auct_location,
            auct_status,
            auct_start_date,
            auct_end_date,
            admin.id,
            admin.id,
            imagePath || '',
          ];

          const [result] = await db.execute(
            "INSERT INTO `auction_detail`( `auct_code`, `auct_name`, `auct_detail`, `auct_location`, `auct_status`, `start_date`, `end_date`, `created_by`, `updated_by`, `image_address`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            valuesToInsert
          );

          console.log("result====>", result);

        return NextResponse.json({ message: "Auction Added Successfully"}, {status:200});

    } catch (error) {
        console.error("Error in add auction", error);
        return NextResponse.json({ message: "Internal Server Error"}, {status:500});
    }
}