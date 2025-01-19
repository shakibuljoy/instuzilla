import React from 'react'

export default function BoolCell({title, status}:{title: {true: string, false: string}, status: boolean}) {
    return (
        <span className={`text-slate-50 ${status ? "bg-green-500" : "bg-red-500"} rounded-md h-4 w-4 items-center p-1`} >{status ? title.true : title.false}</span>
      )
}
