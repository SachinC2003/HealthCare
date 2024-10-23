"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@radix-ui/react-checkbox";
import Appointment from "../../forms/Appointment";

// First, define the Appointment type that matches what you want to display
// In columns.tsx
export type Appointment = {
  id: number;
  doctor: {
      name: string;  // Removed specialization since it's not in the data
  };
  hospital: {
      name: string;
  };
  schedule: Date | null;  // Made nullable to match backend type
  status: string;
};
// Then update the columns to show only what you want to display
export const columns: ColumnDef<Appointment>[] = [
  {
    id: "serialNumber",
    header: "No.",
    cell: ({ row }) => {
      // Adding 1 because row.index is zero-based
      return <div className="text-center">{row.index + 1}</div>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "doctor.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Doctor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  
  {   id:"doctor.name",
      accessorKey: "hospital.name",
      header: ({ column }) => {
          return (
              <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                  Hospital
                  <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
          )
      },
  },
  {
    accessorKey: "schedule",
    header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    cell: ({ row }) => {
        const schedule = row.getValue("schedule") as Date | null;
        if (!schedule) return "Not scheduled";
        return new Date(schedule).toLocaleDateString();
    },
},
  {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return (
              <div className={`text-center font-medium rounded-full px-3 py-1
                  ${status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  status === 'completed' ? 'bg-green-100 text-green-800' : 
                  'bg-red-100 text-red-800'}`}
              >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
              </div>
          );
      },
  }
];