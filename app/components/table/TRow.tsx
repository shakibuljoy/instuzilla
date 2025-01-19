import React from 'react'

export default function TRow({rowData}:{rowData: string[]}) {
    const bolderClasses={
        bolder: "px-6 py-4 font-medium text-gray-900 whitespace-nowrap   dark:text-white",
        normal: "px-6 py-4"
    }
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        {rowData.map((row, index) => (
            (index ==0? (
                <th
      scope="row"
      className={bolderClasses.bolder}
      key={index}
    >
      {row}
    </th>
            ):(
                
            <td key={index} className={bolderClasses.normal}>{row}</td>
            ))
        ))}
    
    
  </tr>
  )
}
