'use client'
import AttendanceDate from '@/app/components/AttendanceDate'
import Calendar from '@/app/components/Calender';
import { MonthPicker } from '@/app/components/MonthSelector'
import { useStudentAttendance } from '@/hooks/fetchAttendence';
import React, { useEffect, useState } from 'react'
export default function Page({params}:{params:{id:string}}) {

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const today = new Date()
  const [date, setDate] = useState<{month:string, year:number, numberMonth:number}>({month:months[today.getMonth()], year:today.getFullYear(), numberMonth:today.getMonth()});
  const {attendenceList} = useStudentAttendance(params.id, date.numberMonth + 1, date.year.toString());
  const [leaveDays, setLeaveDays] = useState<{date:string, type:"present" | "abscent", cause:string | null}[]>([]);

  function dateFormatter(date:string) {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    setLeaveDays(attendenceList.map((attendence) => {
      return {
        date: dateFormatter(attendence.date),
        type: attendence.presents ? "present" : "abscent",
        cause: attendence.cause
      }
    }))
    console.log("Leave Dayes", attendenceList);
  }, [attendenceList])


  


  return (
    <div className="container mx-auto py-10">
      {/* {date && <MonthPicker date={date} setDate={setDate} />} */}
      {/* {date && attendenceList.map((attendence, index) => (
        <AttendanceDate key={index} date={attendence.date.slice(8)} presents={attendence.presents} cause={attendence.cause}/>
      ))} */}
      <Calendar leave_days={leaveDays} date={date} setDate={setDate}/>
    </div>
  )
}
