import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { sendOtpToUser } from '@/lib/twilio';

// Define a schema for validation (if needed)
const PhoneNumberSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

export async function POST(request: Request) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const { phone } = PhoneNumberSchema.parse(body);
    console.log("hii from otp rr1");

    // Check for user in the user collection
    const p_user = await prisma.user.findFirst({
      where: { phone: phone },
    });
    console.log("hii from otp rr2");

    // Check for user in the hospital collection if not found in user collection
    const hospital_user = p_user ? null : await prisma.hospital.findFirst({
      where: { phone: phone },
    });

    // If neither is found, return an error
    if (!p_user && !hospital_user) {
      return NextResponse.json({ error: 'User with this phone number not present' }, { status: 400 });
    }
    console.log("hii from otp rr3");

    // Generate and send OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await sendOtpToUser(phone, otp);

    // Optionally, store OTP and expiration in the database here

    // Determine which collection the user was found in and return the appropriate ID
    const userId = p_user?.id || hospital_user!.id;

    return NextResponse.json({ message: 'OTP sent successfully', otp: otp, id: userId }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Failed to send OTP:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
