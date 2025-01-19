import React from 'react'

export default function THeader({HeaderList}: {HeaderList: string[]}) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {HeaderList.map((header, index) => (
            <th key={index} scope="col" className="px-6 py-3">
            {header}
          </th>
        ))}
        
      </tr>
    </thead>
  )
}
