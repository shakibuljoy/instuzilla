'use client'
import AttendanceDate from '@/app/components/AttendanceDate'
import { MonthPicker } from '@/app/components/MonthSelector'
import { useStudentAttendance } from '@/hooks/fetchAttendence';
import React, { useState } from 'react'
export default function Page({params}:{params:{id:string}}) {

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const today = new Date()
  const [date, setDate] = useState<{month:string, year:number, numberMonth:number}>({month:months[today.getMonth()], year:today.getFullYear(), numberMonth:today.getMonth()});
  const {attendenceList} = useStudentAttendance(params.id, date.numberMonth + 1, date.year.toString())

  


  return (
    <div className='flex flex-col shadow-md bg-slate-50 px-8 py-4 space-y-2 w-52 m-auto'>
      <h1>{attendenceList[0]?.student.first_name}  {attendenceList[0]?.student.last_name}</h1>
      {date && <MonthPicker date={date} setDate={setDate} />}
      {date && attendenceList.map((attendence, index) => (
        <AttendanceDate key={index} date={attendence.date.slice(8)} presents={attendence.presents} cause={attendence.cause}/>
      ))}
    </div>
  )
}
