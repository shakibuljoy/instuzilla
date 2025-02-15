"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import Link from "next/link";
import { AttendList } from "@/lib/TypeOF";
import { PresentsHeader } from "@/app/components/PresentsHeader";
import AttendenceEdit from "@/app/components/AttendenceEdit";

export const columns: ColumnDef<AttendList>[] = [
  
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox 
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
      />
    ),
    cell: ({row}) => (
      <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
      />
    )
  },
  {
    accessorKey: "presents",
    header: ({column}) => {
      return (
        <PresentsHeader column={column} title="Presents" />
      )
    },
    cell: ({ row }) => {
      const attendence = row.original;
    
      return (
        <span className={`text-slate-50 ${attendence.presents ? "bg-green-500" : "bg-red-500"} rounded-md h-4 w-4 items-center p-1`} >{attendence.presents ? "Present" : "Abscent"}</span>
      )
    },
  },
  {
    accessorKey: "student.position",
    meta: 'Position',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
  },
  {
    accessorKey: "cause",
    meta: 'Cause',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cause" />
    ),
  },
  
  {
    accessorKey: "student.first_name",
    meta: 'First Name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
  },
  {
    accessorKey: "student.last_name",
    meta: 'Last Name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
  },
  {
    accessorKey: "student.fathers_name",
    meta: 'Fathers Name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Father's Name" />
    ),
  },
  
  {
    id: "actions",
    cell: ({ row }) => {
      const attendence = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{attendence.student.student_id}</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(attendence.student.student_id)}
            >
              Copy Student ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={`/dashboard/students/${attendence.student.id}`} >View {attendence.student.first_name}</Link></DropdownMenuItem>
            <AttendenceEdit attendence_id={attendence.id} ><Button>Edit Attendece</Button></AttendenceEdit>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];





















