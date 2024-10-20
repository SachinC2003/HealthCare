'use server';
import prisma from '../../lib/prisma';

export const getAllHospital = async () => {
    try {
        const allHospitals = await prisma.hospital.findMany(); // Omit the where clause if no filter is needed
        return allHospitals;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch hospitals'); // Optionally throw an error to handle it better
    }
};
