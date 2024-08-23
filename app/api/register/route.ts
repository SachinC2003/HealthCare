// app/api/userRoute.ts

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { UserFormValidation } from '@/lib/validation'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const formData = UserFormValidation.parse(body)

    // Save the user to the database
    const user = await prisma.user.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
    })

    return NextResponse.json({ message: 'Registration successful!', data: user }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

