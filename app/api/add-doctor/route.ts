import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    console.log("hii from route")
        try{
            const authHeader = request.headers.get("Authorization")
            if (!authHeader) {
                return NextResponse.json({ error: 'Authorization header is missing' }, { status: 401 });
            }

            const token = authHeader.split(' ')[1];
            if (!token) {
                return NextResponse.json({ error: 'Token is missing from the Authorization header' }, { status: 401 });
            }
            console.log("Received token:", token);

            let decoded;
            try {
                decoded = verifyToken(token);
                console.log("Decoded token:", decoded);

                if (!decoded || typeof decoded !== 'object' || !('hospitalId' in decoded)) {
                    return NextResponse.json({ error: 'Invalid token structure' }, { status: 400 });
                }
            } catch (verifyError) {
                console.error("Error verifying token:", verifyError);
                return NextResponse.json({ error: "Invalid token", details: verifyError }, { status: 401 });
            }

            let body;
            try{
                body = await request.json();
            }catch(parseError){
                console.error("Failed to parse request body:", parseError);
                return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
            }

            const hospitalId = decoded.hospitalId;

            const doctor = await prisma.doctor.create({
                data: {
                    hospitalId: hospitalId,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    phone: body.phone,
                    specialization: body.specialization,
                    qualification: body.qualification,
                    experience: body.experience,
                    iconImage: body.iconImage,
                },
            });

            if (!doctor) {
                return NextResponse.json({ error: 'Hospital not found' }, { status: 404 });
            }
            // Return the hospital information
            return NextResponse.json({ data: doctor });
        }catch(error){
            console.error("Unexpected error in POST /api/hospital-info:", error);
            return NextResponse.json({ error: 'Internal Server Error', details: error }, { status: 500 });
        }
}