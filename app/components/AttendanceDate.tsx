import React from 'react'

export default function AttendanceDate({date,presents, cause}:{date:string,presents:boolean, cause:string | null}) {
  return (
    <div className={`text-slate-50 p-2 rounded-md shadow-md ${presents ? "bg-green-500" : "bg-red-500"}`} >
        <span className='font-bold text-xl border-r-2 border-slate-50 pr-3'>{date}</span>
        
        <span className='font-bold ml-2.5' >Presents</span>
        <br />
        {cause && <span>Cause: {cause}</span>}
         
    </div>
  )
}
