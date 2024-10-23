'use server';

import prisma from '../../lib/prisma';

export const getCount = async (hospitalId: number) => {
    try {
        // Ensure hospitalId is a number
        const parsedHospitalId = Number(hospitalId);
        //console.log(parsedHospitalId, typeof parsedHospitalId);

        // Retrieve the hospitalId associated with the hospitalId
        // Group appointments by their status and count each type
        const appointmentCounts = await prisma.appointment.groupBy({
            by: ['status'],
            where: {
                hospitalId: parsedHospitalId // Use the hospitalId to filter appointments
            },
            _count: {
                status: true
            }
        });
        console.log(appointmentCounts)
        // Return the counts for each status
        return appointmentCounts;
    } catch (error) {
        console.log(error);
        return null; // Or handle the error as needed
    }
};
