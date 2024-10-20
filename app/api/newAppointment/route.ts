import { NextResponse } from 'next/server';
import { z } from 'zod';
import { CreateAppointmentSchema } from '@/lib/validation';
import prisma from '@/lib/prisma';
import { sendAppointmentConfirmation } from '@/lib/twilio';

export async function POST(request: Request) {
  try {
    console.log("apo 1")
    const body = await request.json();
    const formData = CreateAppointmentSchema.parse(body);
    console.log("apo 2")
    // Validate that the doctor exists
    const doctor = await prisma.doctor.findUnique({
      where: { id: formData.doctorId }
    });
    console.log("apo 3")
    if (!doctor) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      );
    }
    console.log("apo 4")
    // Validate that the hospital exists
    const hospital = await prisma.hospital.findUnique({
      where: { id: Number(formData.hospitalId) }
    });
    console.log("apo 5")
    if (!hospital) {
      return NextResponse.json(
        { error: 'Hospital not found' },
        { status: 404 }
      );
    }
    console.log("apo 6")
    // Validate that the user exists
    const user = await prisma.user.findUnique({
      where: { id: formData.userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    console.log("apo 7")
    // Create appointment with validated relationships
    const appointment = await prisma.appointment.create({
      data: {
        userId: formData.userId,
        doctorId: formData.doctorId,
        hospitalId: Number(formData.hospitalId),
        primaryPhysician: formData.primaryPhysician,
        schedule: formData.schedule,
        reason: formData.reason,
        note: formData.note ?? undefined,
        cancellationReason: formData.cancellationReason ?? undefined,
        status: 'pending',
      },
    });
    console.log("apo 8")
    // Send SMS confirmation
    /*if (user.phone) {
      const appointmentDetails = `Doctor: ${formData.primaryPhysician}, Date: ${new Date(formData.schedule).toLocaleString()}`;
      try {
        await sendAppointmentConfirmation(user.phone, appointmentDetails);
      } catch (smsError) {
        console.error('Error sending SMS confirmation:', smsError);
        // Optionally handle SMS sending failure (e.g., log it, but don't fail the whole request)
      }
    }*/
    console.log("apo 9")
    return NextResponse.json({
      message: 'Appointment saved successfully!',
      data: appointment
    }, { status: 200 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating appointment:', error);
    
    return NextResponse.json({
      error: 'Internal Server Error'
    }, { status: 500 });
  }
}