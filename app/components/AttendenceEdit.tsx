'use client'
import { useToast } from '@/components/ui/use-toast';
import {fetchEditAttendence } from '@/utils/fetchAttendence';
import React, { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogAction,AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import useEditAttendence from '@/hooks/useEditAttendence';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';

export default function AttendenceEdit({attendence_id, children}:{attendence_id:string, children:React.ReactNode}) {
    const {toast} = useToast();
    const {attendence, setAttendence} = useEditAttendence(attendence_id);
    const [cause, setCause] = useState('');
    const [presents, setPresents] = useState('false');

    useEffect(() => {
      if(attendence){
        setCause(attendence.cause ? attendence.cause : '')
        setPresents(attendence.presents.toString())
      }
    },[attendence])

    const presentHandle = async () => {
        const formData = new FormData()
        formData.append('cause', cause);
        formData.append('presents', presents);
          try {
            const response = await fetchEditAttendence(attendence_id, formData)
            if (response) {
                setAttendence(response)
                setCause(attendence?.cause || '')
                setPresents(attendence?.presents.toString() || "false")
            }
          } catch (error: any) {
            toast({
              variant:'destructive',
              title: "Error",
              description: error.message
            })
          }
      }
  return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            {children}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Editing {attendence?.student.student_id}</AlertDialogTitle>
              <AlertDialogDescription>
                <Label className='mb-6' >Cause:</Label>
                <Input className='text-slate-950 text-lg'
                
                placeholder='Causes...'
                 onChange={(e) => setCause(e.target.value)}
                  value={cause}/>
                <Label className='mb-6' >Attendance:</Label>
                <Select  onValueChange={(value) => setPresents(value)} value={presents}>
                  <SelectTrigger className={`${presents === 'true'? "bg-blue-500" : "bg-red-500"} text-slate-50 w-[180px]`} >
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectGroup>
                      <SelectLabel  >Attendence</SelectLabel>
                      <SelectItem value='true' >Present</SelectItem>
                      <SelectItem  value='false' >Abscent</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => presentHandle()} >Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
  
}
