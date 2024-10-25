
import bcrypt from "bcrypt";
import { NextResponse } from 'next/server';
import { getUserById } from '@/utils/getUserById';
import { verifyToken } from '@/utils/verifytoken';
import { updatePassword } from "@/utils/updatePassword";
import cors from "@/lib/cors";

const config = {
  api: {
    bodyParser: false,    // disable next js body parsing
  },
}

export async function POST(req) {

  const headers = cors(req); // Get CORS headers

  // Handle CORS preflight
  if (headers.status === 200) {
    return new Response(null, { status: 200, headers }); // Return early for OPTIONS request
  }

  try {
    
    const formData = await req.formData();
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");
    const oldPassword = formData.get("oldPassword");
    // Check for newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: 'New password and confirm password do not match' },
        { status: 400 }
      );
    }

    const token = req.headers.get('authorization')?.split(' ')[1]; // assuming Bearer token

    if (!token) {
      return NextResponse.json({ message: 'Token Expired, Please Sign In' }, { status: 401 });
    }

    // Verify token 
    const { id: userId } = verifyToken(token); 
    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check if oldPassword matches the current password in the database
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: 'Old password is incorrect' },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await updatePassword(userId, hashedPassword);

    return NextResponse.json({ message: 'Password changed successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error changing password', error: error.message },
      { status: 500 }
    );
  }
}
