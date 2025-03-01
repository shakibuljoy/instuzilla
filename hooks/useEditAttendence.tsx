import { useToast } from '@/components/ui/use-toast'
import { AttendList } from '@/lib/TypeOF'
import { fetchEditAttendence } from '@/utils/fetchAttendence'
import React, { useState } from 'react'

export default function useEditAttendence(attendec_id:string | null) {
    const [attendence, setAttendence] = useState<AttendList | null>()
    const {toast} = useToast()


    React.useEffect(() => {
      if(attendec_id){
        const getAttendence = async () => {
          try{
            const data = await fetchEditAttendence(attendec_id)
          if(data.success){
            setAttendence(data.success)
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
        getAttendence();
      
      }
        },[attendec_id])
  return (
    {
        attendence:attendence,
        setAttendence:setAttendence,
    }
  )
}
