import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Column, Table } from "@tanstack/react-table";
import { boolean } from "zod";

interface SearchTableProps<TData> {
    table: Table<TData>;
  }

export default function SearchTable<TData>({ table }: SearchTableProps<TData>) {
  const [search, setSearch] = React.useState<string>("");
  const handleClassSelect = (value: string) => {
    setSearch(value);
  };

  const getMeta = (column:Column<TData, unknown>) => {
    const colDef = column.columnDef;
    if(colDef !== undefined && typeof colDef.meta === 'string'){
      return colDef.meta;
    }else{
      return column.id;
    }
  }


  return (
    <div className="flex space-x-3">
      <Select onValueChange={handleClassSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select search by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Search By</SelectLabel>
            {table.getAllColumns().map((column) => (
             column.id !== 'actions' && column.id !== 'select' && column.getCanFilter() && (
                <SelectItem key={column.id} value={column.id}>
                
                {getMeta(column)}
              </SelectItem>
              )
              
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        placeholder={`Search...`}
        value={(table.getColumn(search)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(search)?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </div>
  );
}
