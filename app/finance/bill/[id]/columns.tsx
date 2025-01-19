"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

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
import { billSchema } from "@/lib/TypeOF";
import { TwoWayHeader } from "@/app/components/TwoWayHeader";
import BoolCell from "@/app/components/BoolCell";


export const columns: ColumnDef<billSchema>[] = [
  
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
    accessorKey: "id",
    meta: 'Bill Id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bill Id" />
    ),
    
  },
  {
    accessorKey: "paid",
    header: ({column}) => {
      return (
        <TwoWayHeader column={column} title="Status" status={{true: 'Paid', false:'Unpaid'}} />
      )
    },
    cell: ({ row }) => {
      const bill = row.original;
    
      return (
        <BoolCell status={bill.paid} title={{true: 'Paid', false: 'Unpaid'}} />
      )
    },
  },
  {
    accessorKey: "fee_title",
    meta: 'Title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "fee_amount",
    meta: 'Bill Amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bill Amount" />
    ),
  },
  
  {
    accessorKey: "due_date",
    meta: 'Due Date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
  },
  {
    accessorKey: "discount",
    meta: 'Discount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount" />
    ),
  },
  {
    accessorKey: "trx",
    meta: 'Transaction',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction" />
    ),
  },
  {
    accessorKey: "get_payable_amount",
    meta: 'Payable Amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payable Amount" />
    ),
  },
  
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const attendence = row.original;
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>{attendence.student.student_id}</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(attendence.student.student_id)}
  //           >
  //             Copy Student ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem><Link href={`/students/${attendence.student.id}`} >View {attendence.student.first_name}</Link></DropdownMenuItem>
  //           <AttendenceEdit attendence_id={attendence.id} ><Button>Edit Attendece</Button></AttendenceEdit>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];





















