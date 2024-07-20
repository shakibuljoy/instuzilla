import { useToast } from '@/components/ui/use-toast'
import { AttendList } from '@/lib/TypeOF'
import { setAttendence } from '@/utils/fetchAttendence'
import React, { useState } from 'react'

export default function useFetchAttendence(klass_id:string | null) {
    const [attendenceList, setAttendenceList] = useState<AttendList[] | []>([])
    const {toast} = useToast()

    React.useEffect(() => {
      if(klass_id){
        const getAttendence = async () => {
          try{
            const attendence = await setAttendence(klass_id)
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
        getAttendence();
      
      }
        },[klass_id])
  return (
    {
        attendenceList:attendenceList,
        setAttendenceList:setAttendenceList
    }
  )
}
