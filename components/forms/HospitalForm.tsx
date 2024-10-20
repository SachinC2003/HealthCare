"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { HospitalFormValidation } from "@/lib/validation"
import axios from "axios"
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT ='select',
    SKELETON = 'skeleton'
}

export function HospitalForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof HospitalFormValidation>>({
    //resolver: zodResolver(HospitalFormValidation),
    defaultValues: {
      hospitalName: "",
      email: "",
      phone: "",
    },
  })

  async function onSubmit(values: z.infer<typeof HospitalFormValidation>) {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/hospitalregister', values);
      
      console.log('Success:', response.data);
  
      // Optional: Store JWT token if returned in the response
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token); // Store the token for future use
      }
      console.log(response.data.hospital.id);
      const hospitalId = response.data.hospital.id;
      router.push(`/hospitals/${hospitalId}/hospitalinfo`); // Redirect to the admin page after registration
      toast.success("Sign up successfully.");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Axios Error:', err.response?.data || err.message);
      } else {
        toast.error("Unexpected Error.");
        console.error('Unexpected Error:', err);
      }
    } finally {
      setIsLoading(false);
    }
  }
  
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section>
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">Register your Hospital.</p>
        </section>

        <CustomFormField 
             fieldType={FormFieldType.INPUT}
             control={form.control}
             name="hospitalName"
             label="Hospital Name"
             placeholder="abc"
             iconSrc="/accests/icons/LeadIcon.svg"
             iconAlt="hospital"
        />

        <CustomFormField 
             fieldType={FormFieldType.INPUT}
             control={form.control}
             name="email"
             label="Email Address"
             placeholder="abc@gmail.com"
             iconSrc="/accests/icons/LeadIcon-E.svg"
             iconAlt="user"
        />

        <CustomFormField 
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Phone Number"
                placeholder="+91 000000000"
                iconSrc="/accests/icons/LeadIcon-C.svg"
                iconAlt="user"
        />
        
        <SubmitButton isLoading={isLoading}>
          Get Started
        </SubmitButton>
        <p className="text-center">
          You already have an account? <button onClick={() => router.push('/hospitals/Login')}  className="text-sm text-blue-400">Sign-in</button>
        </p>
      </form>
    </Form>
  )
}

export default HospitalForm

