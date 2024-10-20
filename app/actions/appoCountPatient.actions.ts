'use server';

import prisma from '../../lib/prisma';

export const getCount = async (UserId: number) => {
    try {
        const parsedUserId = Number(UserId);
        console.log(parsedUserId, typeof parsedUserId);

        // Group appointments by their status and count each type
        const appointmentCounts = await prisma.appointment.groupBy({
            by: ['status'],
            where: {
                userId: parsedUserId // Use the hospitalId to filter appointments
            },
            _count: {
                status: true
            }
        });
        console.log("c4")
        console.log(appointmentCounts)
        // Return the counts for each status
        return appointmentCounts;
    } catch (error) {
        console.log(error);
        return null; // Or handle the error as needed
    }
};
