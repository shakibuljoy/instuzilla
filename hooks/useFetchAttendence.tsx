import { useToast } from '@/components/ui/use-toast'
import { AttendList } from '@/lib/TypeOF'
import { fetchAttendence } from '@/utils/fetchAttendence'
import React, { useState } from 'react'

export default function useFetchAttendence(klass_id:string | null, date?:string) {
    const [attendenceList, setAttendenceList] = useState<AttendList[] | []>([])
    const {toast} = useToast()

    const getAttendence = async (klass_id: string, date?:string) => {
      
      try{
        const attendence = await fetchAttendence(klass_id,undefined, date)
      if(attendence){
        setAttendenceList(attendence)
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
      if(klass_id){
        
        getAttendence(klass_id,date);
      
      }
        },[klass_id,date])
  return (
    {
        attendenceList:attendenceList,
        setAttendenceList:setAttendenceList,
    }
  )
}
