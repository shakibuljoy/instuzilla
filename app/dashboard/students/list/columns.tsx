"use client";

import { ColumnDef } from "@tanstack/react-table";
import {  MoreHorizontal } from "lucide-react";

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
import { StatusHeader } from "../../../components/StatusHeader";
import Link from "next/link";
import { studentInfo } from "@/lib/TypeOF";
import { TwoWayHeader } from "@/app/components/TwoWayHeader";
import BoolCell from "@/app/components/BoolCell";
import UserCreation from "@/app/components/UserCreation";


export const columns: ColumnDef<studentInfo>[] = [
  
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
    accessorKey: "full_klass",
    meta: 'Class',
    header: ({ column }) => {
    
      return (
        <StatusHeader column={column} title="Class" /> 
      )
    },
  },
  {
    accessorKey: "student_id",
    meta: 'Student ID',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student ID" />
    ),
  },
  {
    accessorKey: "first_name",
    meta: "First Name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
  },
  {
    accessorKey: "last_name",
    meta: "Last Name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
  },
  {
    accessorKey: "mobile",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mobile" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "user",
    meta: "User Name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Name" />
    ),
  },
  {
    accessorKey: "active",
    header: ({ column }) => (
  
      <TwoWayHeader column={column} title="Status" status={{true: 'Active', false:'Inactive'}} />
    ),
    cell: ({ row }) => {
      const student = row.original;
    
      return (
        <BoolCell status={student.active} title={{true: 'Active', false: 'Inactive'}} />
      )
  }},
  {
    accessorKey: "account_created",
    meta: "Account",
    header: ({ column }) => (
      <TwoWayHeader column={column} title="Account" status={{true: 'Yes', false:'No'}} />
    ),
    cell: ({ row }) => {
      const student = row.original;
    
      return (
        <BoolCell status={student.account_created} title={{true: 'Yes', false: 'No'}} />
      )
  }},
  
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{student.student_id}</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(student.student_id)}
            >
              Copy Student ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href={`/dashboard/students/${student.id}`} >View</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href={`/dashboard/students/${student.id}/edit-student/`} >Edit</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href={`/dashboard/students/${student.id}/attendance`} >Attendance</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href={`/dashboard/finance/bill/${student.id}`} >Bills</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href={`/dashboard/students/${student.id}/submit-result`} >Result Submit</Link></DropdownMenuItem>
            {
              !student.account_created && (
                <DropdownMenuItem asChild>
                <UserCreation username={student.email} student_id={student.student_id}>
                  <Button variant="link" className="w-full text-left">Create Account
                  </Button>
                </UserCreation>
                </DropdownMenuItem>
              )
            }
           
            
 
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];





















