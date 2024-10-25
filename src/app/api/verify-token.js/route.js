import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/verifytoken';

export async function POST(request) {
  try {
    const { token } = await request.json(); // Get the token from the request body

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const decoded = verifyToken(token); // Verify the token

    return NextResponse.json({ valid: true, decoded }, { status: 200 });
  } catch (error) {
    console.log("===error in verify token===", error.message);
    return NextResponse.json({ valid: false, error: error.message }, { status: 401 });
  }
}
