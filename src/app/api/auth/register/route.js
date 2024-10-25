import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import path from "path";
import cors from "@/lib/cors";
import bcrypt from "bcrypt";
import db from "@/utils/db";

const config = {
  api: {
    bodyParser: false,    // disable next js body parsing
  },
}

// export const config = {
//   runtime: 'nodejs', // Or 'experimental-edge' if you're using Edge functions
// };

// Create the uploads directory path
const uploadsDir = path.join(process.cwd(), "public/profileImage");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Create a MySQL connection pool
// const pool = mysql.createPool({
//   host:
//     process.env.NODE_ENV === "development"
//       ? process.env.DEV_HOST
//       : process.env.PROD_HOST,
//   user:
//     process.env.NODE_ENV === "development"
//       ? process.env.DEV_USER
//       : process.env.PROD_USER,
//   password:
//     process.env.NODE_ENV === "development" ? "" : process.env.PROD_PASSWORD,
//   database:
//     process.env.NODE_ENV === "development"
//       ? process.env.DEV_DB_NAME
//       : process.env.PROD_DB_NAME,
// });

// POST API route
export async function POST(req) {
  // Handle CORS
  const corsHeaders = cors(req);

  // If it's an OPTIONS request, return early
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    // Extract form data including the file
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const mobile = formData.get("mobile");
    const address = formData.get("address");
    const state = formData.get("state");
    const pincode = formData.get("pincode");
    const handlename = formData.get("handlename");

    // Extract file
    const profilePic = formData.get("profilePic");

    let imagePath = null;
   
    if (profilePic && typeof profilePic === "object" && profilePic.name) {

      const imageFileName = `${Date.now()}-${profilePic.name}`; // To ensure unique names
      imagePath = path.join(uploadsDir, imageFileName);
    
      const buffer = await profilePic.arrayBuffer();
      await fs.promises.writeFile(imagePath, Buffer.from(buffer));
    
      // Save only the relative path to the image 
      imagePath = `/profileImage/${imageFileName}`;
    }


    const [existingUser] = await db.execute(
      "SELECT * FROM register WHERE email = ? OR handlename = ?",
      [email, handlename]
    );

    if (existingUser.length > 0) {
      return new Response(
        JSON.stringify({
          error: "User with this email or handlename is already registered",
        }),
        { status: 409 } 
      );
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const valuesToInsert = [
      name,
      email,
      hashedPassword,
      mobile,
      address,
      state,
      pincode,
      imagePath || "",
      handlename,
    ];

    const [result] = await db.execute(
      "INSERT INTO register (name, email, password, mobile, address, state, pincode, profileimage, handlename) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      valuesToInsert
    );

    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Registration failed" }),
      { status: 500, headers: corsHeaders }
    );
  }
}

