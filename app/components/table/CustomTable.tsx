import React from 'react'
import THeader from './THeader'
import TRow from './TRow'
import TFooter from './TFooter'

export default function CustomTable({rowList, headerList, total}: {rowList: string[][], headerList: string[], total:number}) {

  return (
    <div className="relative overflow-x-auto items-center">
  <table className="m-auto my-4 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <THeader HeaderList={headerList} />
    <tbody>
        {rowList.map((row, index) => (
            <TRow key={index} rowData={row}/>
        ))}
     
    </tbody>
    <TFooter span={2} title='Total =' value={total.toString()} />
  </table>
</div>

  )
}
