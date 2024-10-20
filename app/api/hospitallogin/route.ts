import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { signToken } from '@/lib/jwt';

// Define a schema to validate the request body
const requestBodySchema = z.object({
  id: z.string(), // expecting the ID as a string
});

export async function POST(request: Request) {
  try {
    // Parse and validate the request body using zod
    const body = await request.json();
    // Convert ID to a string
    const parsedBody = requestBodySchema.parse({ id: String(body.id) });
    const { id } = parsedBody;

    // Sign a token using the provided user ID
    const token = signToken({ userId: id });
    console.log("token", token);

    // Return the token with a successful response
    return NextResponse.json({ message: 'Login successful!', token }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // If there's a validation error, return a 400 response with the error details
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Failed to process request:', error);
    // For any other errors, return a 500 response
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
