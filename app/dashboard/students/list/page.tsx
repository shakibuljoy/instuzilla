'use client'
import { useEffect, useState } from "react"
import { DataTable } from "./data-table"
import { getStudentList } from "@/utils/fetchStudent"
import {columns } from "./columns"
import { useToast } from "@/components/ui/use-toast"
import { studentInfo } from "@/lib/TypeOF"
import Loader from "@/app/components/Loader/Loader"
import { useSidebar } from "@/components/ui/sidebar"
import TableSkeleton from "@/app/components/TableSkeleton"



export default function Page() {
  const [studentList, setStudentList] = useState<studentInfo[] | null>(null);
  const {toast} = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const {setOpen} = useSidebar();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try{
        const data = await getStudentList();
      if(data as studentInfo[]){
        setStudentList(data)
        setOpen(false);
      }else{
        setStudentList(null);
      }

      }catch(error:any){
        setLoading(false);
        toast({
          variant:'destructive',
          title: "Error",
          description: error.message
        })
      }
      setLoading(false);
    }
    getData()
  },[])


  return (
    <div className="container mx-auto py-10  ">
      {studentList ? (
        <DataTable columns={columns} data={studentList} />
        
      ):(
        loading ? <TableSkeleton /> : <h1 className="text-center text-2xl text-red-500">No data found</h1>
      )}
      
    </div>
  )
}
