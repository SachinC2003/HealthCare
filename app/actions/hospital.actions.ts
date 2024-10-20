'use server';
import prisma from '../../lib/prisma'
export const getHospital = async (hospitalId: string) => {
    try {
        console.log(hospitalId, typeof(hospitalId));
        const n_hospitalId = parseInt(hospitalId)
        if (isNaN(n_hospitalId)) {
            throw new Error('Invalid hospital ID');
        }

        const hospital = await prisma.hospital.findUnique({
            where: {
                id: n_hospitalId
            }
        });
        return hospital;
    } catch (error) {
        console.log(error);
    }
}
