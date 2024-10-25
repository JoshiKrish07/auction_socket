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

export async function PUT(req, { params }) {
    const { id: auct_id } = params;
  try {
    const formData = await req.formData();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return new NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 }
      );
    }

    let admin;
    try {
      admin = verifyAdmin(token);
    } catch (err) {
      return new NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }
    console.log("=====admin==lots===>", admin);

    // const lot_name = formData.get("lot_name");
    const auction_name = formData.get("auction_name");
    const auct_code = formData.get("auct_code");
    const auct_location = formData.get("auct_location");
    const auct_detail = formData.get("auct_detail");
    const auct_start_date = formData.get("auct_start_date");
    const auct_end_date = formData.get("auct_end_date");
    const auct_status = formData.get("auct_status");

    // check only LIVE auctions can be set to closed
    if(auct_status === 'CLOSED') {
      const prev_auct_status = formData.get("auct_prev_status");
      if(prev_auct_status !== 'LIVE') {
        return NextResponse.json({ error: "Only Live Auctions Can be set to Closed" }, { status: 400 });
      }
    }

    // extract images
    const auct_image = formData.get("auct_image");
    let imagePath = null;

    // lot front image validation
    if (
      auct_image &&
      typeof auct_image === "object" &&
      auct_image.name
    ) {
      const imageFileName = `${Date.now()}-${auct_image.name}`; // To ensure unique names
      imagePath = path.join(uploadsDir, imageFileName);

      const buffer = await auct_image.arrayBuffer();
      await fs.promises.writeFile(imagePath, Buffer.from(buffer));

      // Save only the relative path to the image
      imagePath = `/auction_image/${imageFileName}`;
    } else {
        imagePath = auct_image;
    }

    
    const updateQuery = `UPDATE auction_detail 
    SET auct_code = ?,
        auct_name = ?,
        auct_detail = ?,
        auct_location = ?,
        auct_status = ?,
        start_date = ?,
        end_date = ?,
        updated_by = ?,
        image_address = ?
    WHERE auct_id = ?;`;

    // Values for the update query
    const updateValues = [
      auct_code,
      auction_name,
      auct_detail, 
      auct_location, 
      auct_status,
      auct_start_date, 
      auct_end_date,
      admin.id,
      imagePath || '',
      auct_id
    ];

    const result = await db.execute(updateQuery, updateValues);

    return NextResponse.json({ message: "Auction Updated Successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in update auction", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
