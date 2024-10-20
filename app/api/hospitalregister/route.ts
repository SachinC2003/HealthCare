// app/api/hospitalRoute.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { HospitalFormValidation } from '@/lib/validation';
import prisma from '@/lib/prisma';
import { signToken } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const formData = HospitalFormValidation.parse(body)
    // Save the hospital to the database
    const hospital = await prisma.hospital.create({
      data: {
        hospitalName: formData.hospitalName,
        email: formData.email,
        phone: formData.phone,
      },
    });
    console.log("hospital", hospital);
    // Generate JWT token
    const token = signToken({ hospitalId: hospital.id });
    console.log("token", token);
    return NextResponse.json({ message: 'Registration successful!', token, hospital }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
