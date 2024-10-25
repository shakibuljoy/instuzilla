'use client'
import { DataTable } from "./data-table"
import { columns } from "./columns"

import { useState } from "react"
import useFetchBill from "@/hooks/useFetchBill"



export default function Page({params}:{params:{id:string}}) {
  const student_id = params.id
  const {billList} = useFetchBill(student_id)




  return (
    <div className="container mx-auto py-10">
      
      {
        billList.length > 0 ? (
          <DataTable columns={columns} data={billList} />
        ) : (
          <h1 className="text-center">No Bill data available to show!</h1>
        )}
    </div>
  );
}
