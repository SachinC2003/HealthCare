'use server';

import prisma from '../../lib/prisma';

export const getSessions = async (doctorId: number) => {
    try {
        // Ensure doctorId is a number
        const parsedDoctorId = Number(doctorId);

        const sessions = await prisma.session.findMany({
            where: {
                doctorId: parsedDoctorId
            }
        });

        return sessions;
    } catch (error) {
        console.log('Error fetching sessions:', error);
        return [];  // Return an empty array in case of error
    }
};
