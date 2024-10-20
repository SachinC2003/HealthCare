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
import { UserFormValidation } from "@/lib/validation"
import axios from "axios"
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import { useRouter } from "next/navigation";
import { Link } from "lucide-react"
import { toast } from "react-toastify";

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT ='select',
    SKELETON = 'skeleton'
}

export function PatientForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/register', values);
      
      console.log('Success:', response.data);
  
      // Optional: Store JWT token if returned in the response
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token); // Store the token for future use
      }
      console.log(response.data.user.id);
      const userId = response.data.user.id;
      router.push(`/patients/${userId}/patientInfo`); // Redirect to the admin page after registration
      toast.success("Sign up successfully.");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Axios Error:', err.response?.data || err.message);
      } else {
        toast.error("Error to Sign up.");
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
            <h1 className="header">Hi there</h1>
            <p className="text-dark-700">Schedule your first appointment.</p>
        </section>

        <CustomFormField 
             fieldType={FormFieldType.INPUT}
             control={form.control}
             name="name"
             label="Full Name"
             placeholder="abc"
             iconSrc="/accests/icons/LeadIcon.svg"
             iconAlt="user"
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
          You already have an account? <button onClick={() => router.push('/patients/Login')}  className="text-sm text-blue-400">Sign-in</button>
        </p>
      </form>
    </Form>
  )
}

export default PatientForm

