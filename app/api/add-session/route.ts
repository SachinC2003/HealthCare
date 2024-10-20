// File: /app/api/add-session/route.ts

import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Retrieve and verify the authorization token
        /*const authHeader = request.headers.get("Authorization");
        if (!authHeader) {
            return NextResponse.json({ error: 'Authorization header is missing' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return NextResponse.json({ error: 'Token is missing from the Authorization header' }, { status: 401 });
        }

        let decoded;
        console.log(decoded);
        try {
            decoded = verifyToken(token);
            if (!decoded || typeof decoded !== 'object' || !('hospitalId' in decoded)) {
                return NextResponse.json({ error: 'Invalid token structure' }, { status: 400 });
            }
        } catch (verifyError) {
            console.error("Error verifying token:", verifyError);
            return NextResponse.json({ error: "Invalid token", details: verifyError }, { status: 401 });
        }
*/
        // Parse the request body
        let body;
        try {
            body = await request.json();
        } catch (parseError) {
            console.error("Error parsing body:", parseError);
            return NextResponse.json({ error: "Invalid body", details: parseError }, { status: 400 });
        }

        // Create the session in the database
        const { doctorId, day, startTime, endTime } = body;
        const session = await prisma.session.create({
            data: {
                doctorId,
                day,
                startTime,
                endTime,
            },
        });

        // Check if the session was created
        if (!session) {
            return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
        }

        // Return the created session
        return NextResponse.json({ data: session });
    } catch (error) {
        console.error("Unexpected error in POST /api/add-session:", error);
        return NextResponse.json({ error: 'Internal Server Error', details: error }, { status: 500 });
    }
}
