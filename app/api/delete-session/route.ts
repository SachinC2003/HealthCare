import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    // Extract the session ID from the query parameters
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    // Retrieve and verify the authorization token
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ error: 'Authorization header is missing' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Token is missing from the Authorization header' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = verifyToken(token);
      if (!decoded || typeof decoded !== 'object' || !('hospitalId' in decoded)) {
        return NextResponse.json({ error: 'Invalid token structure' }, { status: 400 });
      }
    } catch (verifyError) {
      console.error("Error verifying token:", verifyError);
      return NextResponse.json({ error: "Invalid token", details: verifyError }, { status: 401 });
    }

    const deletedSession = await prisma.session.delete({
      where: { id: parseInt(sessionId) }
    });

    return NextResponse.json({ message: 'Session deleted successfully', session: deletedSession });
  } catch (error) {
    console.error("Unexpected error in DELETE /api/delete-session:", error);
    return NextResponse.json({ error: 'Internal Server Error', details: error }, { status: 500 });
  }
}