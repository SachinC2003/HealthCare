'use server';

import prisma from '../../lib/prisma';

export const getPatirntAppo = async (UserId: number) => {
    try {
        const parsedUserId = Number(UserId);
        console.log(parsedUserId, typeof parsedUserId);

        // Group appointments by their status and count each type
        const patientAppos = await prisma.appointment.findMany({
            where: {
                userId: parsedUserId // Use the hospitalId to filter appointments
            },
            include: {
                doctor:{
                   select:{
                    firstName:true
                   } 
                },
                hospital:{
                    select: {
                        hospitalName: true
                    }
                }
            }
        });
        console.log("c4")
        console.log(patientAppos)
        // Return the counts for each status
        return patientAppos;
    } catch (error) {
        console.log(error);
        return null; // Or handle the error as needed
    }
};
