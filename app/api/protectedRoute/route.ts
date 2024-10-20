// app/api/protectedRoute/route.ts
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    return NextResponse.json({ message: 'Token is valid', data: decoded }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
