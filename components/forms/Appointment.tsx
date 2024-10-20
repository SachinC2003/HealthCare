"use client"
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SelectItem } from "../ui/select";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { CreateAppointmentSchema } from "@/lib/validation";
import { getDoctors } from "@/app/actions/doctor.actions";
import { getAllHospital } from '@/app/actions/allHospital.actions';
import { Doctor, Hospital } from "@prisma/client";
import { toast } from "react-toastify";

const ExtendedAppointmentSchema = CreateAppointmentSchema.extend({
  doctorId: z.number().min(1, "Doctor selection is required"),
});

type FormData = z.infer<typeof ExtendedAppointmentSchema>;

export function Appointment({ user }: { user: { id: number; name: string; email: string; phone: string; createdAt: Date } }) {
  const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
  const [hospitalList, setHospitalList] = useState<Hospital[]>([]);
  const [hospitalId, setHospitalId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<FormData>({
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
      doctorId: 0,
    },
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      if (hospitalId) {
        try {
          const doctors = await getDoctors(hospitalId);
          console.log("Fetched doctors:", doctors);
          setDoctorsList(doctors || []);
          form.setValue('doctorId', 0);
          form.setValue('primaryPhysician', '');
        } catch (error) {
          console.error("Error fetching doctors:", error);
          setError("Failed to fetch doctors");
        }
      }
    };
    
    fetchDoctors();
  }, [hospitalId, form]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await getAllHospital();
        setHospitalList(response);
      } catch (error) {
        console.error("Failed to fetch hospitals", error);
        setError("Failed to fetch hospitals");
      }
    };
    
    fetchHospitals();
  }, []);

  const handleDoctorSelect = (doctorId: number, doctorName: string) => {
    console.log("Selecting doctor:", doctorId, doctorName);
    form.setValue('doctorId', doctorId, { shouldValidate: true });
    form.setValue('primaryPhysician', doctorName, { shouldValidate: true });
  };

  const onSubmit = async (values: FormData) => {
    setIsLoading(true);
    setError(null);

    console.log("Form values on submit:", values);

    if (!values.doctorId || values.doctorId === 0) {
      setError("Please select a doctor");
      setIsLoading(false);
      return;
    }

    if (!hospitalId) {
      setError("Please select a hospital");
      setIsLoading(false);
      return;
    }

    const appointmentData = {
      userId: Number(user.id),
      doctorId: Number(values.doctorId),
      hospitalId: Number(hospitalId),
      primaryPhysician: values.primaryPhysician,
      schedule: values.schedule.toISOString(),
      reason: values.reason || "",
      note: values.note || "",
      cancellationReason: values.cancellationReason || "",
      status: "pending",
    };

    try {
      const response = await axios.post("/api/newAppointment", appointmentData);
      router.push(`/patients/${user.id}/New-appointment/success`);
      toast.success("Your appointment application send successfully.");
    } catch (err: any) {
      toast.error("Error to book appointment.");
      console.error("Error creating appointment:", err.response?.data || err);
      setError(err.response?.data?.error || "Failed to create appointment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <section>
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">
            Request a new appointment in 10 seconds.
          </p>
        </section>

        <section className='dropdown-section'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-200px px-4 py-2 border border-gray-300 bg-blue-600 text-white rounded-md shadow-sm">
                {hospitalId ? `Hospital ID: ${hospitalId}` : "Select Hospital "}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white w-80 shadow-lg p-4 rounded-lg border border-gray-200 mt-2">
              {hospitalList.map((hospital) => (
                <DropdownMenuItem 
                  key={hospital.id} 
                  onSelect={() => setHospitalId(hospital.id)}
                  className="flex justify-between items-center mt-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <span className="text-gray-800 cursor-pointer">
                    {hospital.hospitalName}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="doctorId"
          label="Doctor"
          placeholder="Select a doctor"
        >
          {doctorsList.map((doctor) => (
            <SelectItem
              key={doctor.id}
              value={doctor.id.toString()}
            >
              <div className="flex cursor-pointer items-center gap-2">
                <Image 
                  src="/assets/icons/logo.svg" 
                  width={32} 
                  height={32} 
                  alt="doctor" 
                  className="rounded-full border border-dark-500" 
                />
                <p>{doctor.firstName} {doctor.lastName}</p>
                <button className="">Doctor Info</button>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="schedule"
          label="Expected appointment date"
          showTimeSelect
          dateFormat="MM/dd/yyyy - h:mm aa"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="reason"
            label="Appointment reason"
            placeholder="Annual monthly check-up"
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="note"
            label="Comments/notes"
            placeholder="Prefer afternoon appointments, if possible"
          />
        </div>

        <SubmitButton
          isLoading={isLoading}
          className="shad-primary-btn w-full"
        >
          Submit Appointment
        </SubmitButton>
      </form>
    </Form>
  );
}

export default Appointment;