import db from "@/utils/db";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import cors from "@/lib/cors";
import { verifyAdmin } from "@/utils/verifyAdmin";

// Create the uploads directory path
const uploadsDir = path.join(process.cwd(), "public/assets/img/lot_images");
console.log("====>uploadsDir===>", uploadsDir);
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

export async function PUT(req, { params }) {
    const { id: lot_id } = params;
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
    const lot_code = formData.get("lot_code");
    const lot_description = formData.get("lot_decription");
    const lot_est_min_bid = formData.get("lot_est_min_bid");
    const lot_est_max_bid = formData.get("lot_est_max_bid");
    const lot_min_increment = formData.get("lot_min_increment");
    const lot_status = formData.get("lot_status");
    const mat_id = formData.get("materialId");
    const cat_id = formData.get("categoryId");

    // extract images

    const lot_front_img = formData.get("lot_front_img");
    const lot_img_1 = formData.get("lot_img_1");
    const lot_img_2 = formData.get("lot_img_2");
    const lot_img_3 = formData.get("lot_img_3");

    let frontImgPath = null;
    let lotImg1Path = null;
    let lotImg2Path = null;
    let lotImg3Path = null;

    // lot front image validation
    if (
      lot_front_img &&
      typeof lot_front_img === "object" &&
      lot_front_img.name
    ) {
      const imageFileName = `${Date.now()}-${lot_front_img.name}`; // To ensure unique names
      frontImgPath = path.join(uploadsDir, imageFileName);

      const buffer = await lot_front_img.arrayBuffer();
      await fs.promises.writeFile(frontImgPath, Buffer.from(buffer));

      // Save only the relative path to the image
      frontImgPath = `assets/img/lot_images/${imageFileName}`;
    } else {
        frontImgPath = lot_front_img
    }

    // lot image 1 validation
    if (lot_img_1 && typeof lot_img_1 === "object" && lot_img_1.name) {
      const imageFileName = `${Date.now()}-${lot_img_1.name}`; // To ensure unique names
      lotImg1Path = path.join(uploadsDir, imageFileName);

      const buffer = await lot_img_1.arrayBuffer();
      await fs.promises.writeFile(lotImg1Path, Buffer.from(buffer));

      // Save only the relative path to the image
      lotImg1Path = `assets/img/lot_images/${imageFileName}`;
    } else {
        lotImg1Path = lot_img_1;
    }

    // lot image 2 validation
    if (lot_img_2 && typeof lot_img_2 === "object" && lot_img_2.name) {
      const imageFileName = `${Date.now()}-${lot_img_2.name}`; // To ensure unique names
      lotImg2Path = path.join(uploadsDir, imageFileName);

      const buffer = await lot_img_2.arrayBuffer();
      await fs.promises.writeFile(lotImg2Path, Buffer.from(buffer));

      // Save only the relative path to the image
      lotImg2Path = `assets/img/lot_images/${imageFileName}`;
    } else {
        lotImg2Path = lot_img_2;
    }

    // lot image 3 validation
    if (lot_img_3 && typeof lot_img_3 === "object" && lot_img_3.name) {
      const imageFileName = `${Date.now()}-${lot_img_3.name}`; // To ensure unique names
      lotImg3Path = path.join(uploadsDir, imageFileName);

      const buffer = await lot_img_3.arrayBuffer();
      await fs.promises.writeFile(lotImg3Path, Buffer.from(buffer));

      // Save only the relative path to the image
      lotImg3Path = `assets/img/lot_images/${imageFileName}`;
    } else {
        lotImg3Path = lot_img_3;
    }


    // const updateQuery = `UPDATE 'lot_detail' SET 'lot_code'=${lot_code.toUpperCase()},'lot_est_min_bid'=${lot_est_min_bid},'lot_est_max_bid'=${lot_est_max_bid},'lot_min_incr'=${lot_min_increment},'lot_cat_id'=${cat_id},'lot_mat_id'=${mat_id},'lot_front_img'=${frontImgPath},'lot_status'=${lot_status},'lot_description'=${lot_description},'lot_img_1'=${lotImg1Path},'lot_img_2'=${lotImg2Path},'lot_img_3'= ${lotImg3Path} WHERE lot_id = ${lot_id}`

    const formattedLotId = lot_id < 10 ? `0${lot_id}` : `${lot_id}`;

    const updateQuery = `UPDATE lot_detail 
    SET lot_code = CONCAT(?, '-', ?),
        lot_est_min_bid = ?,
        lot_est_max_bid = ?,
        lot_min_incr = ?,
        lot_cat_id = ?,
        lot_mat_id = ?,
        lot_front_img = ?,
        lot_status = ?,
        lot_description = ?,
        lot_img_1 = ?,
        lot_img_2 = ?,
        lot_img_3 = ?
    WHERE lot_id = ?;`;

    // Values for the update query
    const updateValues = [
      lot_code.toUpperCase(),
      formattedLotId,
      lot_est_min_bid, 
      lot_est_max_bid, 
      lot_min_increment,
      cat_id, 
      mat_id,
      frontImgPath, // Front image path
      lot_status, 
      lot_description, 
      lotImg1Path, 
      lotImg2Path, 
      lotImg3Path,
      lot_id 
    ];

    const result = await db.execute(updateQuery, updateValues);
    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Error in add lot", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
