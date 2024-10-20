import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1]; // Bearer <token>
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }
    
    // Verify the JWT token
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (verifyError) {
      console.error("Token verification failed:", verifyError);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const userId = Number(decoded.userId);
    // Save the user information to the database
    const information = await prisma.information.create({
        data: {
          userId: userId, 
          name: body.name,
          email: body.email,
          phone: body.phone,
          birthDate: new Date(body.birthDate),
          gender: body.gender,
          address: body.address,
          occupation: body.occupation,
          emergencyContactName: body.emergencyContactName,
          emergencyContactNumber: body.emergencyContactNumber,
          primaryPhysician: body.primaryPhysician ?? "",
          insuranceProvider: body.insuranceProvider ?? "",
          insurancePolicyNumber: body.insurancePolicyNumber ?? "",
          allergies: body.allergies ?? "",
          currentMedication: body.currentMedication ?? "",
          familyMedicalHistory: body.familyMedicalHistory ?? "",
          pastMedicalHistory: body.pastMedicalHistory ?? "",
          identificationType: body.identificationType ?? "",
          identificationNumber: body.identificationNumber ?? "",
          identificationDocument: body.identificationDocument ? body.identificationDocument[0]?.name : null,
          privacyConsent: body.privacyConsent ?? false,
          treatmentConsent: body.treatmentConsent ?? false,
          disclosureConsent: body.disclosureConsent ?? false
        },
      });

    return NextResponse.json({ message: 'Information saved successfully!', data: information }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error in POST /api/patient-info:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}