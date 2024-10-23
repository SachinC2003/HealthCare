"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CancelePopup } from "@/components/forms/CancelPopup";
import { SchedulePopup } from "@/components/forms/SchedulePopup";
import { toast } from "react-toastify";

export type Appointment = {
  id: number;
  doctor: {
    name: string;
  };
  hospital: {
    name: string;
  };
  schedule: Date | null;
  status: string;
  user: {
    name: string;
    phone: string
  };
};

const token = localStorage.getItem("token");

const handleCancel = async (appointment: Appointment) => {
  try {
    console.log("phone",appointment.user.phone)
    const response = await fetch(`/api/cancelAppo?id=${appointment.id}&phone=${appointment.user.phone}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log(`Appointment with ID ${appointment.id} canceled successfully.`);
      toast.success("Appointment Canceled ")
    } else {
      console.error("Failed to cancel the appointment. Status code:", response.status);
    }
  } catch (error) {
    console.error("An error occurred while canceling the appointment:", error);
  }
};

const handleSchedule = async (appointment: Appointment) => {
  try {
    const response = await fetch(`/api/scheduleAppo?id=${appointment.id}&phone=${appointment.user.phone}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log(`Appointment with ID ${appointment.id} scheduled successfully.`);
      toast.success("Appointment scheduled")
    } else {
      console.error("Failed to schedule the appointment. Status code:", response.status);
    }
  } catch (error) {
    console.error("An error occurred while scheduling the appointment:", error);
  }
};

export const columns: ColumnDef<Appointment>[] = [
  {
    id: "serialNumber",
    header: "No.",
    cell: ({ row }) => (
      <div className="text-center">{row.index + 1}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "user.name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Patient Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const userName = row.original.user?.name ?? "Unknown";
      return <div>{userName}</div>;
    },
  },
  {
    accessorKey: "doctor.name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Doctor
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "schedule",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const schedule = row.getValue("schedule") as Date | null;
      return schedule ? new Date(schedule).toLocaleDateString() : "Not scheduled";
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const appointment = row.original;
      const [cancelPopup, setCancelPopup] = useState(false);
      const [schedulePopup, setSchedulePopup] = useState(false);
      return (
        <div className="flex justify-center space-x-2">
          <Button
          className="text-red-700"
            variant="destructive"
            onClick={() => setCancelPopup(true)}
          >
            Cancel
          </Button>
          <Button
          className="text-green-400"
            onClick={() => setSchedulePopup(true)}
          >
            Schedule
          </Button>

          {cancelPopup && (
            <CancelePopup
              appointment={appointment}
              onClose={() => setCancelPopup(false)}
              onConfirm={(appointment) => {
                handleCancel(appointment);
                setCancelPopup(false);
              }}
            />
          )}

          {schedulePopup && (
            <SchedulePopup
              appointment={appointment}
              onClose={() => setSchedulePopup(false)}
              onConfirm={(appointment) => {
                handleSchedule(appointment);
                setSchedulePopup(false);
              }}
            />
          )}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className={`text-center font-medium rounded-full px-3 py-1
          ${status === 'pending' ? 'bg-yellow-100 text-yellow-500' : 
            status === 'canceled' ? 'bg-red-100 text-red-800' : 
            'bg-green-100 text-green-900'}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      );
    },
  }
];