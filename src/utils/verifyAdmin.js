import jwt from "jsonwebtoken";

export const verifyAdmin = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_LOGIN_ADMIN_KEY);
    console.log("=====decoded==admin==>", decoded);
    return decoded;
  } catch (error) {
    // if token is expired
    if (error.name === "TokenExpiredError") {
      throw new Error("Token has expired");
    }
    throw new Error("Invalid token");
  }
};

