import React from 'react'

export default function DetailChips({label, value}:{label:string, value:string}) {
  return (
    <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>{label}:</strong> {value}</p>
  )
}
