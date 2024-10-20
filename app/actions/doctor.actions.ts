'use server';

import prisma from '../../lib/prisma';

export const getDoctors = async (hospitalId?: number) => {
  try {
    // Check if `hospitalId` is provided, if so, fetch doctors for the specific hospital
    if(hospitalId)
    {
        const doctors = await prisma.doctor.findMany({
        where: hospitalId ? { hospitalId: Number(hospitalId) } : {}, // If `hospitalId` is undefined, fetch all doctors
        });
        return doctors;
    }else{
      const doctors = await prisma.doctor.findMany();
      console.log(doctors); // Log the doctors to check the output
      return doctors;
    }
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
};

