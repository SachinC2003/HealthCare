import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    // Extract the doctor ID from the query parameters
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get('id');
    console.log("doctorId", doctorId)
    if (!doctorId) {
      return NextResponse.json({ error: 'Doctor ID is required' }, { status: 400 });
    }

    // Retrieve and verify the authorization token
    const authHeader = request.headers.get("Authorization");
    console.log("authHeader", authHeader)
    if (!authHeader) {
      return NextResponse.json({ error: 'Authorization header is missing' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    console.log("token", token)
    if (!token) {
      return NextResponse.json({ error: 'Token is missing from the Authorization header' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { hospitalId } = decoded;

    const deletedDoctor = await prisma.doctor.delete({
      where: { id: parseInt(doctorId) }
    });

    return NextResponse.json({ message: 'Doctor deleted successfully', doctor: deletedDoctor });
  } catch (error) {
    console.error("Unexpected error in DELETE /api/delete-doctor:", error);
    return NextResponse.json({ error: 'Internal Server Error', details: error }, { status: 500 });
  }
}