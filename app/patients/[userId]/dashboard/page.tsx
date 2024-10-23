"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StatCard from '@/components/StatCard';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { DataTable } from '@/components/table/DataTable';
import { Appointment, columns } from '@/components/table/columns/patientColumn';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { getCount } from '@/app/actions/appoCountPatient.actions';
import { Prisma } from '@prisma/client';
import { getPatirntAppo } from '@/app/actions/patientAppos';
import { default_Appointment } from '@/app/constants';


interface SearchParamProps {
  params: {
    userId: number;
  };
}

type AppointmentCount = {
  status: string; // Change this if it's supposed to be a specific string union
  _count: {
      status: number; // This must be present
  };
};


const PatientDashboard = ({ params: { userId } }: SearchParamProps) => {
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [data, setData] = useState<Appointment[]>([]);
  const [appointmentCounts, setAppointmentCounts] = useState<AppointmentCount[] | null>(null); // Change here to allow null

  const router = useRouter();

  const handleBookAppointment = () => {
    setShowBooking(true);
  };
 
  useEffect(() => {
    // Assuming getCount can return null or an array of counts
    const fetchAppointmentCount = async () => {
      try {
          const counts = await getCount(Number(userId));
          
          // Check if counts is an array
          if (Array.isArray(counts)) {
              // Validate that every count has the expected structure
              const isValid = counts.every(count => 
                  typeof count === 'object' && count !== null &&
                  typeof count.status === 'string' && // Ensure status is a string
                  typeof count._count === 'object' &&
                  count._count !== null &&
                  typeof count._count.status === 'number' // Ensure _count.status is a number
              );
  
              if (isValid) {
                  setAppointmentCounts(counts as AppointmentCount[]); // Cast to AppointmentCount[]
              } else {
                  setAppointmentCounts(null); // Handle invalid structure
              }
          } else {
              setAppointmentCounts(null); // Handle case when counts is not an array
          }
          
          console.log("count", counts);
      } catch (error) {
          console.error('Error fetching appointment count:', error);
          setAppointmentCounts(null); // Handle error state
      }
  };

  const fetchAppointments = async() => {
    try {
        const appointments = await getPatirntAppo(Number(userId));
        
        // Handle null case
        if (!appointments) {
            setData([]);
            return;
        }

        // Transform the data
        const formattedAppointments: Appointment[] = appointments.map(appt => ({
            id: appt.id,
            doctor: {
                name: appt.doctor.firstName
            },
            hospital: {
                name: appt.hospital.hospitalName
            },
            schedule: appt.schedule,
            status: appt.status
        }));
        
        setData(formattedAppointments);
        console.log("Formatted appointments:", formattedAppointments);
    } catch(error) {
        console.error('Error fetching appointments:', error);
        setData([]);
    }
  }

    fetchAppointments();
    fetchAppointmentCount();
  }, [userId]);

  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <header className='admin-header'>
        <Link href="/" className='cursor-pointer'>
          <Image
            src="/accests/icons/Logo.svg"
            height={32}
            width={162}
            alt="Logo"
            className='h-8 w-fit'
          />
        </Link>
        <p className='text-16-semibold'>Patient Dashboard</p>
      </header>

      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <h1 className='header'>Welcome, Patient</h1>
          <p className='text-dark-700'>Manage your appointments</p>
        </section>

        <section className='admin-stat'>
          <StatCard
            type='appointments'
            count={appointmentCounts?.find(count => count.status === 'appointment')?._count?.status || 0} 
            label="Upcoming"
            icon='/accests/icons/appointment.png'
          />
          <StatCard
            type='pending'
            count={appointmentCounts?.find(count => count.status === 'pending')?._count?.status || 0} 
            label="Completed"
            icon='/accests/icons/pending.png'
          />
          <StatCard
            type='cancelled'
            count={appointmentCounts?.find(count => count.status === 'canceled')?._count?.status || 0} 
            label="Cancelled"
            icon='/accests/icons/cancel.png'
          />
        </section>

        <section className='dropdown-section'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                onClick={() => router.push(`/patients/${userId}/New-appointment`)}
                className="w-200px px-4 py-2 border border-gray-300 bg-blue-600 text-white rounded-md shadow-sm 
                          hover:bg-blue-700 hover:border-gray-400 transition-all duration-300 ease-in-out">
                Book Appointment
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </section>

        <div className="container mx-auto py-10">
        {data.length > 0 ? (
          <DataTable columns={columns} data={data} />
        ) : (
          <DataTable columns={columns} data={[default_Appointment]} />
        )}
      </div>
      </main>
    </div>
  );
};

export default PatientDashboard;