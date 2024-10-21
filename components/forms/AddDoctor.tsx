"use client";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import axios from "axios";
import { DoctorFormValidation } from "@/lib/validation";
import { DoctorFormDefaultValues } from "@/app/constants";
import { Hospital } from "@prisma/client";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";
import { FileUploader } from "../FileUploder";

type DoctorFormData = z.infer<typeof DoctorFormValidation>;

export function AddDoctor({ hospital }: { hospital: Hospital }) {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Ensure the component is rendered on the client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<DoctorFormData>({
    //resolver: zodResolver(DoctorFormValidation),
    defaultValues: {
      ...DoctorFormDefaultValues,
      experience: '',
    },
  });

  const onSubmit = async (values: DoctorFormData) => {
    setIsLoading(true);
    console.log("hii from req 1")
    const token = localStorage.getItem("token");
    const doctor = {
      hospitalId: hospital.id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      specialization: values.specialization,
      qualification: values.qualification,
      experience: values.experience,
      iconImage: values.iconImage,
    };
    console.log("hii from req")
    try {
      await axios.post("/api/add-doctor", doctor, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Doctor added successfully.");
      window.location.reload();
      if (isClient) {
        
        router.push(`/hospitals/${hospital.id}/dashboard`);
      }
    } catch (error) {
      toast.error("Error to add doctor.");
      console.error("Failed to add doctor:", error);
    }
    setIsLoading(false);
  };

  if (!isClient) {
    return null; // Prevent rendering on the server
  }
  const onIdentificationDocumentChange = (files: File[]) => {
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black overflow-auto z-30">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Add New Doctor</h1>
        <p className="text-white mb-6 text-xl font-bold">Enter the details of the new doctor.</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <section>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-white">Personal Information</h2>
              </div>
              <div className="flex flex-col gap-5 md:flex-row">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="firstName"
                  label="First Name"
                  placeholder="Enter first name"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter last name"
                />
              </div>

              <div className="flex flex-col gap-5 md:flex-row">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="email"
                  label="Email Address"
                  placeholder="johndoe@gmail.com"
                />
                <CustomFormField
                  fieldType={FormFieldType.PHONE_INPUT}
                  control={form.control}
                  name="phone"
                  label="Contact Number"
                  placeholder="(555) 123-4567"
                />
              </div>
            </section>

            <section>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-white">Additional Information</h2>
              </div>
              <div className="flex flex-col gap-5 md:flex-row">
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="specialization"
                  label="Specialization"
                  placeholder="Enter specialization"
                />
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="qualification"
                  label="Qualification"
                  placeholder="Enter qualification"
                />
              </div>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="experience"
                label="Years of Experience"
                placeholder="Enter years of experience"
              />
              {/*<CustomFormField
                fieldType={FormFieldType.SKELETON}
                control={form.control}
                name="identificationDocument"
                label="Upload profile picture of doctor"
                renderSkeleton={(field) => (
                  <FileUploader
                    files={field.value as File[]}
                    onFileChange={onIdentificationDocumentChange}
                    label="Profile picture"
                  />
                )}
              />*/}
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="iconImage"
                label="Icon Image URL"
                placeholder="Enter icon image URL"
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

export default AddDoctor;
