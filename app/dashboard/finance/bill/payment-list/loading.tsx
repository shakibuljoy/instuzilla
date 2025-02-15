import TableSkeleton from '@/app/components/TableSkeleton'
import React from 'react'

export default function Loading() {
  return (
    <div className="flex justify-center w-full h-full p-10">
    <TableSkeleton />
  </div>
  )
}
