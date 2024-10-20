import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const PatientFormValidation = z.object({
  userId: z.number(),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters")
    .max(500, "Occupation must be at most 500 characters"),
  emergencyContactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(50, "Contact name must be at most 50 characters"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Invalid phone number"
    ),
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  insuranceProvider: z
    .string()
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters"),
  insurancePolicyNumber: z
    .string()
    .min(2, "Policy number must be at least 2 characters")
    .max(50, "Policy number must be at most 50 characters"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to treatment in order to proceed",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
});

export const HospitalFormValidation = z.object({
  hospitalName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const HospitalInfoFormValidation = z.object({
  userId: z.number(),
  hospitalName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  address: z
     .string()
     .min(2, "Name must be at least 2 characters")
     .max(50, "Name must be at most 50 characters"),
  hospitalType: z
     .string(),
  license: z
     .string(),
  governmentScheme: z
    .string()
});

export const DoctorFormValidation = z.object({
  doctorId: z.number(),
  firstName: z
    .string()
    .min(2, "First Name must be at least 2 characters")
    .max(50, "First Name must be at most 50 characters"),
  lastName: z
    .string()
    .min(2, "Last Name must be at least 2 characters")
    .max(50, "Last Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  specialization: z
     .string()
     .min(2, "specialization must be at least 2 characters")
     .max(50, "specialization must be at most 50 characters"),
  qualification: z
     .string()
     .min(2, "qualification must be at least 2 characters")
     .max(50, "qualification must be at most 50 characters"),
  experience: z
     .string(),
  iconImage: z
     .string()
});

export const SessionFormValidation = z.object({
  sessionId: z.number(),
  doctorId: z.number(),
  day: z.coerce.date(),
  startTime: z.coerce.date(), // Coerce to a Date object if you're using time in Date format
  endTime: z.coerce.date(),
});

export const CreateAppointmentSchema = z.object({
  userId: z.number(),
  doctorId: z.number(),
  hospitalId: z.number(),
  primaryPhysician: z.string(),
  schedule: z.coerce.date(),  // Add coerce to handle string-to-date conversion
  reason: z.string(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});
