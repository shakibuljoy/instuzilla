import { useToast } from '@/components/ui/use-toast'
import { AttendList } from '@/lib/TypeOF'
import { fetchAttendence, fetchStudentAttendance } from '@/utils/fetchAttendence'
import React, { useState } from 'react'

export default function useFetchAttendence(klass_id:string | null, date?:string) {
    const [attendenceList, setAttendenceList] = useState<AttendList[] | []>([])
    const [loading, setLoading] = useState(false);
    const {toast} = useToast()

    const getAttendence = async (klass_id: string, date?:string) => {
      setLoading(true);
      try{
        const data = await fetchAttendence(klass_id,undefined, date)
      if(data.success){
        setAttendenceList(data.success)
      }else{
        toast({
          variant: 'destructive',
          title: 'Error',
          description: data.error
        })
      }
      }catch(error:any){
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message
        })
      }finally{
        setLoading(false);
      }
      
    } 

    React.useEffect(() => {
      if(klass_id){
        
        getAttendence(klass_id,date);
      
      }
        },[klass_id,date])
  return (
    {
        attendenceList:attendenceList,
        setAttendenceList:setAttendenceList,
        loading:loading,
    }
  )
}



export function useStudentAttendance(id:string, month:number, year:string) {
  const [attendenceList, setAttendenceList] = useState<AttendList[] | []>([])
  const {toast} = useToast()

  const getAttendence = async (id:string, month:number, year:string) => {
    
    try{
      const data = await fetchStudentAttendance(id,month,year)
    if(data.success){
      setAttendenceList(data.success)
    }else{
      toast({
        variant: 'destructive',
        title: 'Error',
        description: data.error
      })
    }
    }catch(error:any){
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message
      })
    }
    
  }

  React.useEffect(() => {
    getAttendence(id,month,year)
  },[id,month,year])

  
return (
  {
      attendenceList:attendenceList,
  }
)
}