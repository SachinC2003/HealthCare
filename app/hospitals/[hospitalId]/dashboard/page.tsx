"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StatCard from '@/components/StatCard';
import { DataTable } from '@/components/table/DataTable';
import { Appointment, columns } from '@/components/table/columns';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { AddDoctor } from '@/components/forms/AddDoctor';
import { AddSession } from '@/components/forms/AddSession';
import { getHospital } from '@/app/actions/hospital.actions';
import { getDoctors } from '@/app/actions/doctor.actions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSessions } from '@/app/actions/session.actions';
import { getCount } from '@/app/actions/appoCount.actions';
import { Prisma } from '@prisma/client';
import axios from 'axios';

interface Doctor {
  id: number;
  hospitalId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  qualification: string;
  experience: string;
  iconImage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface SessionData {
  id: number;
  day: string;
  startTime: Date;
  endTime: Date;
  doctorId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface SearchParamProps {
  params: {
    hospitalId: number;
  };
}


const Hospital = ({ params: { hospitalId } }: SearchParamProps) => {
  const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
  const [doctorId, setDoctorId] = useState<number | null>(null);
  const [sessionList, setSessionList] = useState<SessionData[]>([]);
  const [hospital, setHospital] = useState<{
    id: number;
    hospitalName: string;
    email: string;
    phone: string;
    createdAt: Date;
  } | null>(null);

  const [addDoctor, setAddDoctor] = useState(false);
  const [addSession, setAddSession] = useState(false);
  const [data, setData] = useState<Appointment[]>([]);
  const [appointmentCounts, setAppointmentCounts] = useState<(Prisma.PickEnumerable<Prisma.AppointmentGroupByOutputType, "status"> & { _count: { status: number } })[] | null>(null);

  // Fetch Hospital, Doctors, and Sessions separately
  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const result = await getHospital(hospitalId.toString());
        if (result) setHospital(result);
      } catch (error) {
        console.error('Error fetching hospital:', error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const doctors = await getDoctors(Number(hospitalId));
        setDoctorsList(doctors || []);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchHospital();
    fetchDoctors();
  }, [hospitalId]);

  useEffect(() => {
    const fetchAppointmentCount = async () => {
        try {
          const counts = await getCount(Number(hospitalId)); // Fetch appointment counts for selected doctor
          setAppointmentCounts(counts); // Set the counts in state
        } catch (error) {
          console.error('Error fetching appointment count:', error);
        }
    };

    fetchAppointmentCount();
  }, [doctorId, hospitalId]);

  // Separate function to fetch sessions for a doctor
  const fetchSessions = async (doctorId: number) => {
    try {
      const sessions: SessionData[] = await getSessions(doctorId);
      setSessionList(sessions || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const handleAddSession = (doctorId: number) => {
    setDoctorId(doctorId);
    setAddSession(true);
    fetchSessions(doctorId); // Call fetchSessions separately
  };

  const handleAddDoctor = () => {
    setAddDoctor(true);
  };

  const handleDeleteDoctor = async (doctorId: number) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/delete-doctor`, {
        params: { id: doctorId },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
        }
      });
  
      if (response.status === 200) {
        console.log('Doctor deleted successfully:', response.data);
        // Optionally, update your UI or state here
        // For example, remove the doctor from a list or redirect
      } else {
        throw new Error('Failed to delete doctor');
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleDeleteSession = async (sessionId: number) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/delete-session`, {
        params: { id: sessionId },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
        }
      });
  
      if (response.status === 200) {
        console.log('session deleted successfully:', response.data);
        // Optionally, update your UI or state here
        // For example, remove the doctor from a list or redirect
      } else {
        throw new Error('Failed to delete session');
      }
    } catch (error) {
      console.error('Error deleting session:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  if (!hospital) {
    return <p>Loading hospital information...</p>;
  }

  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <header className='admin-header sticky top-0'>
        <Link href="/" className='cursor-pointer'>
          <Image
            src="/accests/icons/Logo.svg"
            height={32}
            width={162}
            alt="Logo"
            className='h-8 w-fit'
          />
        </Link>
        <p className='text-16-semibold'>Hospital Dashboard</p>
      </header>

      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <h1 className='header'>Welcome</h1>
          <p className='text-dark-700'>Start the day with managing new appointments</p>
        </section>

        <section className='admin-stat'>
        <StatCard
          type='appointments'
          count={appointmentCounts?.find(count => count.status === 'appointment')?._count?.status || 0} 
          label="Appointments"
          icon='/accests/icons/appointment.png'
        />
        <StatCard
          type='pending'
          count={appointmentCounts?.find(count => count.status === 'pending')?._count?.status || 0} 
          label="Pending"
          icon='/accests/icons/pending.png'
        />
        <StatCard
          type='cancelled'
          count={appointmentCounts?.find(count => count.status === 'cancelled')?._count?.status || 0} 
          label="Cancelled"
          icon='/accests/icons/cancel.png'
        />

        </section>

        <section className='dropdown-section'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                className="w-200px px-4 py-2 border border-gray-300 bg-blue-600 text-white rounded-md shadow-sm 
                          hover:bg-blue-700 hover:border-gray-400 transition-all duration-300 ease-in-out">
                Doctors
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                            className="bg-white w-90 shadow-lg p-4 rounded-lg border border-gray-200 mt-2 transition-all duration-200 ease-in-out">
                            <DropdownMenuItem
                className="text-blue-600 font-semibold cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-all border border-b-slate-800"
                onClick={handleAddDoctor}
              >
                <span className="flex items-center space-x-80 ">
                  <span>Add Doctor</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
              </DropdownMenuItem>
              {doctorsList.map((doctor) => (
                <DropdownMenuItem 
                key={doctor.id} 
                className="flex justify-between items-center mt-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
                <span className="text-gray-800 text-lg font-medium">{doctor.firstName} {doctor.lastName}</span>
                <div className='flex space-x-1'>
                    <Button 
                      className="ml-4 px-3 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 
                                hover:text-white transition-all duration-300"
                      onClick={() => handleAddSession(doctor.id)}
                    >
                      Add Session
                    </Button>
                    
                    {/* Adding stopPropagation to prevent the dropdown from closing */}
                    <Select>
                      <SelectTrigger 
                        className="w-50 px-3 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 
                                  hover:text-white transition-all duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevents closing the dropdown
                                    fetchSessions(doctor.id); // Fetch sessions for the selected doctor
                                  }} // Prevents closing the dropdown
                      >
                        <SelectValue placeholder="Session's" />
                      </SelectTrigger>
                      <SelectContent className="bg-white shadow-lg rounded-md mt-1 border border-gray-300 max-h-60 overflow-y-auto">
                        {sessionList.map((session) => (
                          <SelectItem
                          key={session.id}
                          value={session.id.toString()}
                          className="px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md cursor-pointer transition-all duration-200 ease-in-out"
                        >
                          {session.startTime.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })} -  &nbsp; 
                          {session.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} &nbsp;
                          to &nbsp;
                          {session.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                          <Button 
                            className="ml-4 px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-500 
                                      hover:text-white transition-all duration-300"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevents the select item from closing
                              handleDeleteSession(session.id); // Calls the delete session function
                            }}
                          >
                            Delete Session
                          </Button>

                        </SelectItem>     
                                       
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      className="ml-4 px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-500 
                                hover:text-white transition-all duration-300"
                      onClick={() => handleDeleteDoctor(doctor.id)}
                    >
                      Delete Doctor
                    </Button>
                </div>
                
              </DropdownMenuItem>              
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        {data.length > 0 ? (
          <DataTable columns={columns} data={data} />
        ) : (
          <p>Loading data...</p>
        )}
      </main>

      {addDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <AddDoctor hospital={hospital} />
            <Button onClick={() => setAddDoctor(false)}>Close</Button>
          </div>
        </div>
      )}

      {addSession && doctorId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2>Add Session</h2>
            <AddSession doctorId={doctorId} />
            <Button onClick={() => setAddSession(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hospital;
