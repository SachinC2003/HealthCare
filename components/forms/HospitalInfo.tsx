"use client";
import { HospitalInfoFormDefaultValues, HospitalTypes } from "@/app/constants";
import { HospitalInfoFormValidation } from "@/lib/validation";
import { Hospital } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import { FormProvider, useForm } from "react-hook-form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { SelectItem } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import SubmitButton from "../SubmitButton";
import axios from "axios";
import { toast } from "react-toastify";

const HospitalInfo = ({ hospital }: { hospital: Hospital }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formMethods = useForm<z.infer<typeof HospitalInfoFormValidation>>({
    defaultValues: {
      ...HospitalInfoFormDefaultValues,
      hospitalName: hospital.hospitalName,
      email: hospital.email,
      phone: hospital.phone,
    },
  });

  const onSubmit = async (values: z.infer<typeof HospitalInfoFormValidation>) => {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      const info = {
        hospitalId: hospital.id,
        hospitalName: values.hospitalName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        license: values.license,
        hospitalType: values.hospitalType,
        governmentScheme: values.governmentScheme
      }

      try{
            const response = await axios.post(`/api/hospital-info`, info, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            router.push(`/hospitals/${hospital.id}/dashboard`);
            toast.success("Hospital information stoare Successfully")
        } catch (error) {
          toast.error("Error to fill Hospital.")
            console.error("Failed to register patient:", error);
            // Handle error
        }
        setIsLoading(false);
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="flex-1 space-y-12">
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about Hospital.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Hospital Information</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={formMethods.control}
            name="hospitalName"
            label="Hospital name"
            placeholder="hospital name"
            iconSrc="/accests/icons/LeadIcon.svg"
            iconAlt="hospital"
          />

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={formMethods.control}
              name="email"
              label="Email address"
              placeholder="abc@gmail.com"
              iconSrc="/accests/icons/LeadIcon-E.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={formMethods.control}
              name="phone"
              label="Phone Number"
              iconSrc="/accests/icons/LeadIcon-E.svg"
              placeholder="(555) 123-4567"
            />
          </div>
          
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={formMethods.control}
            name="address"
            label="Address"
            placeholder="address"
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Details of Hospital</h2>
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={formMethods.control}
              name="license"
              label="License No."
              placeholder="license no."
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={formMethods.control}
              name="hospitalType"
              label="Hospital type"
              placeholder="Select a hospital type"
            >
              {HospitalTypes.map((HospitalType, i) => (
                <SelectItem key={HospitalType.name + i} value={HospitalType.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <p>{HospitalType.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
          </div>
        </section>

        <section>
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Government Scheme</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={formMethods.control}
            name="governmentScheme"
            label="Government Scheme"
            placeholder="Enter government scheme"
          />
        </section>

        <SubmitButton
          text="Next"
          isLoading={isLoading}
        >
          NEXT
        </SubmitButton>
      </form>
    </FormProvider>
  );
};

export default HospitalInfo;