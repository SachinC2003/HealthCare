"use client"

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import axios from "axios";
import { SessionFormValidation } from "@/lib/validation";
import { SessionFormDefaultValues } from "@/app/constants";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import "react-time-picker/dist/TimePicker.css";
import { toast } from "react-toastify";

type SessionFormData = z.infer<typeof SessionFormValidation>;

export function AddSession({ doctorId }: { doctorId: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // This should now work correctly

  const form = useForm<SessionFormData>({
    //resolver: zodResolver(SessionFormValidation),
    defaultValues: {  
      ...SessionFormDefaultValues, 
      endTime: new Date(Date.now()),
    },
  });

  const onSubmit = async (values: SessionFormData) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const session = {
      doctorId,
      day: values.day,
      startTime: values.startTime,
      endTime: values.endTime,
    };

    try {
      await axios.post("http://localhost:3000/api/add-session", session, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Session added successfully.");
      window.location.reload();
    } catch (error) {
      toast.error("Error to add session.");
      console.error("Failed to add session:", error);
      // Consider adding error handling here, e.g., displaying an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-2xl font-bold text-white mb-4">Arrange New Session</h1>
        <p className="text-gray-300 mb-6">Enter the Day and Date of the new Session.</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <section>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-white">Session Information</h2>
              </div>

              <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="day"
              label="Date of Session"
            />
              <CustomFormField
                fieldType={FormFieldType.TIME_PICKER}
                control={form.control}
                name="startTime"
                label="Start Time"
              />
              <CustomFormField
                fieldType={FormFieldType.TIME_PICKER}
                control={form.control}
                name="endTime"
                label="End Time"
              />
            </section>

            <SubmitButton
              text="Next"
              isLoading={isLoading}
            >
              NEXT
            </SubmitButton>
            
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AddSession;