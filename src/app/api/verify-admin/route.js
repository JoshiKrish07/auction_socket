import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/utils/verifyAdmin';

export async function POST(request) {
  try {
    const { token } = await request.json(); // Get the token from the request body

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const decoded = verifyAdmin(token); // Verify the token

    return NextResponse.json({ valid: true, decoded }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ valid: false, error: error.message }, { status: 401 });
  }
}
