"use client";
import * as React from "react";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import { Filter } from "lucide-react";
import SearchTable from "@/app/components/SearchTable";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [selectedId,setSelectedId] = React.useState<Array<Record<string, any>> | []>([])
  const [totalAmount, setTotalAmount] = React.useState(0)

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
 

  const getMeta = (column:Column<TData, unknown>) => {
    const colDef = column.columnDef;
    if(typeof colDef.meta === 'string'){
      return colDef.meta;
    }else{
      return column.id;
    }
  }
  React.useEffect(() => {
    let selectedRows: Array<Record<string, any>> = []; // Array to hold all selected row data

    if (table.getFilteredSelectedRowModel().rows.length > 0) {
      table.getFilteredSelectedRowModel().rows.forEach((row) => {
        let rowData: Record<string, any> = {}; // Object to hold each row's data
  
        row.getAllCells().forEach((cell: any) => {
          rowData[cell.column.id] = cell.getValue(); // Add each column's value to the row object
        });
  
        selectedRows.push(rowData); // Add the row object to the list of selected rows
      });
  
      // Set the selectedId state to the list of row objects (each with all column values)
      setSelectedId(selectedRows);
    } else {
      setSelectedId([]); // Reset to empty array if no rows are selected
    }
  }, [rowSelection])

  React.useEffect(() => {
    const totalAmount = table
      .getColumn('get_total_amount')
      ?.getFacetedRowModel().rows.map(row => row.original.get_total_amount) // Extract amount from each row
      .reduce((sum, amount) => sum + amount, 0); // Sum all amounts

      setTotalAmount(totalAmount)
  }, [])
  return (
    <div>

      <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
       
      <div className="flex py-4 space-x-2">
          <SearchTable table={table} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Visibility
              <Filter size="22px" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                
                return (
                  column.id !== ('actions' || 'select') &&
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalized"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {getMeta(column)}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
              <div className="text-xl text-left border rounded-md p-1" >
                Total Fund: <span className="font-bold text-right text-red-400">{totalAmount}</span> 
              </div>
      </div>
      <div className="rounded-md border bg-white shadow-lg">
        <Table>
          <TableHeader className="border border-b-2">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border border-dashed">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex item-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
