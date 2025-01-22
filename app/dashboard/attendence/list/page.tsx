'use client'
import { DataTable } from "./data-table"
import { columns } from "./columns"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import useFetchAttendence from "@/hooks/fetchAttendence"
import useFetchClasses from "@/hooks/useFetchClasses"
import { useState } from "react"
import { DatePicker } from "@/app/components/DatePicker"


export default function Page() {
  const { classObject } = useFetchClasses();
  const [klass, setKlass] = useState<string | null>(null);
  const [date, setDate] = useState<Date>();
  const { attendenceList } = useFetchAttendence(klass,formatDate(date))


  function formatDate(date?:Date) {
    if (!date) return undefined; // Handle null or undefined date

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

  const handleClassSelect = (value: string) => {
    setKlass(value);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex space-x-2">
      <Select onValueChange={handleClassSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a class" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Classes</SelectLabel>
            {classObject.length > 0 && classObject.map(field => (
              <SelectItem key={field.id} value={field.id.toString()}>
                {field.full_klass}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <DatePicker date={date} setDate={setDate} />
      </div>
      
      {klass ? (
        attendenceList.length > 0 ? (
          <DataTable columns={columns} data={attendenceList} />
        ) : (
          <h1 className="text-center">No attendance data available to show!</h1>
        )
      ) : (
        <h1 className="text-center">Please select a class to view attendance.</h1>
      )}
    </div>
  );
}
