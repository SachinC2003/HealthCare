import { Appointment } from "@prisma/client";
import { z } from "zod";

export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const HospitalInfoFormDefaultValues = {
  hospitalName: "",
  email: "",
  phone: "",
  address: "",
  hospitalType: "",
  license: "",
  governmentScheme: ""
};

export const DoctorFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  specialization: "",
  qualification: "",
  experience: "",
  iconImage: ""
};

export const AppointmentFormDefaultValues = {
  primaryPhysician: "",
  schedule: new Date(Date.now()),
  reason: "",
  note: "",
  cancellationReason: "",
  status: ""
}

export const SessionFormDefaultValues = {
  day: new Date(Date.now()),
  startTime: new Date(Date.now()),
  endTime: new Date(Date.now()),
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  }
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};

export const HospitalTypes = [
  {
    name: "General Medicine Hospital",
  },
  {
    name: "Cardiology Hospital",
  },
  {
    name: "Oncology Hospital",
  },
  {
    name: "Orthopedic Hospital",
  },
  {
    name: "Pediatric Hospital",
  },
  {
    name: "Neurology and Neurosurgery Hospital",
  },
  {
    name: "Maternity and Women's Health Hospital",
  },
  {
    name: "Psychiatric Hospital",
  },
  {
    name: "Rehabilitation Hospital",
  },
  {
    name: "Pulmonology Hospital",
  },
];

export const default_Appointment = {
  id: 0,
  doctor: {
    name: ".............",
  },
  hospital: {
    name: ".........",
  },
  schedule: null,
  status: "............",
};
