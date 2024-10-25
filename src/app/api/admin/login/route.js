import cors from "@/lib/cors";
import db from "@/utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
    return jwt.sign(
      { id: user.id, username: user.name },
      process.env.JWT_LOGIN_ADMIN_KEY,
      { expiresIn: "1d" }
    );
  };  

// Admin Login
export async function POST(req) {
    const headers = cors(req); // Get CORS headers
  
    // Handle CORS preflight
    if (headers.status === 200) {
      return new Response(null, { status: 200, headers }); // Return early for OPTIONS request
    }
  
    return new Promise(async (resolve, reject) => {
      try {
        const formData = await req.formData();
        const handlename = formData.get("name");
        const password = formData.get("password");
        // Check if the user exists in the database
        const [user] = await db.execute(
          "SELECT * FROM admin WHERE user_name = ?",
          [handlename]
        );

        if (user.length === 0) {
          // User not found
          return resolve(
            new Response(
              JSON.stringify({ error: "Invalid handlename or password" }),
              { status: 401 } // Unauthorized
            )
          );
        }

        const userRecord = user[0];
  
        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password.trim(), userRecord.user_password);

        if (!isPasswordValid) {
          // Invalid password
          return resolve(
            new Response(
              JSON.stringify({ error: "Invalid name or password" }),
              { status: 401 }
            )
          );
        }
  
        // Generate a token for the user
        const token = generateToken({ id: userRecord.user_id, name: userRecord.user_name });
  
        // Respond with the token
        return resolve(
          new Response(
            JSON.stringify({ message: "Login successful", token }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          )
        );
      } catch (error) {
        console.error("Error in admin login logic:", error);
        return resolve(
          new Response(JSON.stringify({ error: "Login failed" }), {
            status: 500,
          })
        );
      }
    });
  }
  