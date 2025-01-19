import React from 'react'

export default function TFooter({span, title, value}:{span: number, title: string, value: string}) {
  return (
    <tfoot>
        <tr className='bg-white border-t' >
            <td colSpan={span}></td>
            <td className="px-6 py-4 font-bold text-black" >{title}</td>
            <td className="px-6 py-4 font-bold text-green-500" >{value}</td>
        </tr>
    </tfoot>
  )
}
