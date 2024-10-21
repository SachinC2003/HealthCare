'use server'

import prisma from "../../lib/prisma"

export const getHospitalAppo = async (hospitalId : number) =>{
    try{
        const ParsedHospitalId = Number(hospitalId)
        console.log(ParsedHospitalId);

        const appointment = await prisma.appointment.findMany({
            where:{
                hospitalId : ParsedHospitalId 
            }, 
            include:{
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
        })
        console.log(appointment);
        return appointment;
    }catch(error){
        console.log(error);
        return null; // Or handle the error as needed
    }
}