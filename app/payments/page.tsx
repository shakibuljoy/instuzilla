'use client'
import { useEffect, useState } from "react"
import { studentInfo } from "../students/[id]/page"
import { DataTable } from "./data-table"
import { getStudentList } from "@/utils/fetchStudent"
import {columns } from "./columns"
import { useToast } from "@/components/ui/use-toast"



export default function page() {
  const [studentList, setStudentList] = useState<studentInfo[] | null>(null);
  const {toast} = useToast()

  useEffect(() => {
    const getData = async () => {
      try{
        const data = await getStudentList();
      if(data as studentInfo[]){
        setStudentList(data)
      }else{
        setStudentList(null);
      }

      }catch(error:any){
        toast({
          variant:'destructive',
          title: "Error",
          description: error.message
        })
      }
      
    }
    getData()
  },[])


  return (
    <div className="container mx-auto py-10  ">
      {studentList ? (
        <DataTable columns={columns} data={studentList} />
      ):(
        <h1>No student available to show!</h1>
      )}
      
    </div>
  )
}
