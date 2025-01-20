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
import { PaymentSchema, PaymentType } from "@/lib/TypeOF";


const getTotalAmountSum = (data: any[]) => {
  return data.reduce((total, item) => total + item.get_total_amount, 0);
};


export const columns: ColumnDef<PaymentSchema>[] = [
  
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
    accessorKey: "trx_id",
    meta: 'TRX ID',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction Id" />
    ),
    
  },
  {
    accessorKey: "status",
    meta: 'Status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    
  },
  {
    accessorKey: "get_total_amount",
    meta: 'Amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    footer: ({ table }) => {
      const data = table.getFilteredRowModel().rows.map(row => row.original);
      const totalAmountSum = getTotalAmountSum(data);
      return <div>Total: {totalAmountSum}</div>;
    },
  },
  {
    accessorKey: "created_at",
    meta: 'Created',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
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





















