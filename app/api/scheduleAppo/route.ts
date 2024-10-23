import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { sendAppointmentScheduleMassege } from "@/lib/twilio";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    // Extract the appointment ID from the query parameters
    const { searchParams } = new URL(request.url);
    const appointmentId = searchParams.get('id');
    let phone = searchParams.get('phone');
    console.log("appointmentId", appointmentId);
    if (!appointmentId) {
      return NextResponse.json({ error: 'Appointment ID is required' }, { status: 400 });
    }

    // Retrieve and verify the authorization token
    const authHeader = request.headers.get("Authorization");
    console.log("authHeader", authHeader);
    if (!authHeader) {
      return NextResponse.json({ error: 'Authorization header is missing' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    console.log("token", token);
    if (!token) {
      return NextResponse.json({ error: 'Token is missing from the Authorization header' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { hospitalId } = decoded;

    // Check if the appointment exists and is associated with the hospital
    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(appointmentId) },
    });

    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    // If necessary, verify that the hospital has permission to cancel this appointment
    /*console.log(appointment.hospitalId);
    console.log(hospitalId);
    if (appointment.hospitalId !== hospitalId) {
      return NextResponse.json({ error: 'Not authorized to cancel this appointment' }, { status: 403 });
    }*/

    // Cancel the appointment by updating its status
    const scheduledAppointment = await prisma.appointment.update({
      where: { id: parseInt(appointmentId) },
      data: { status: 'scheduled' },  // You could use any status that signifies cancellation
    });

    if (phone) {
      //const appointmentDetails = `Doctor: ${formData.primaryPhysician}, Date: ${new Date(formData.schedule).toLocaleString()}`;
      try {
        console.log("cancel appo")
        await sendAppointmentScheduleMassege("+"+phone);
      } catch (smsError) {
        console.error('Error sending SMS confirmation:', smsError);
        // Optionally handle SMS sending failure (e.g., log it, but don't fail the whole request)
      }
    }
    return NextResponse.json({ message: 'Appointment scheduled successfully', appointment: scheduledAppointment });
  } catch (error) {
    console.error("Unexpected error in PUT /api/cancel-appointment:", error);
    return NextResponse.json({ error: 'Internal Server Error', details: error }, { status: 500 });
  }
}
