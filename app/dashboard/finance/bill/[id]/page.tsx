'use client'
import { DataTable } from "./data-table"
import { columns } from "./columns"

import { useState } from "react"
import useFetchBill from "@/hooks/useFetchBill"
import TableSkeleton from "@/app/components/TableSkeleton"



export default function Page({params}:{params:{id:string}}) {
  const student_id = params.id
  const {billList, loading} = useFetchBill(student_id)




  return (
    <div className="container mx-auto py-10">
      {loading && <TableSkeleton/>}
      {
        billList.length > 0 && !loading ? (
          <DataTable columns={columns} data={billList} />
        ) : (
          <h1 className="text-center">No Bill data available to show!</h1>
        )}
    </div>
  );
}
