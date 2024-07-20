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

import useFetchAttendence from "@/hooks/useFetchAttendence"
import useFetchClasses from "@/hooks/useFetchClasses"
import { useState } from "react"

export default function Page() {
  const { classObject } = useFetchClasses();
  const [klass, setKlass] = useState<string | null>(null);
  const { attendenceList } = useFetchAttendence(klass)

  const handleClassSelect = (value: string) => {
    setKlass(value);
  };

  return (
    <div className="container mx-auto py-10">
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
      {klass ? (
        attendenceList.length > 0 ? (
          <DataTable columns={columns} data={attendenceList} />
        ) : (
          <h1 className="text-center">No student available to show!</h1>
        )
      ) : (
        <h1 className="text-center">Please select a class to view attendance.</h1>
      )}
    </div>
  );
}
