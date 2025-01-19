'use client'
import {
    ArrowUpIcon,
    CaretSortIcon,
    EyeNoneIcon
} from "@radix-ui/react-icons"
import { Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import React from "react"
import useFetchClasses from "@/hooks/useFetchClasses"

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
        column: Column<TData, TValue>
        title: string
    }

export function StatusHeader<TData, TValue>({
    column,
    title,
    className
}: DataTableColumnHeaderProps<TData, TValue>) {
    const { classes } = useFetchClasses();
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>
    }
    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        <span>{title}</span>
                        {column.getIsSorted() === "desc" ? (
                            <ArrowUpIcon className="ml-2 h-4 w-4" />
                        ) : (
                            <CaretSortIcon className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {classes.map((field: string, index: number) => (
                        <DropdownMenuCheckboxItem
                            key={index}
                            onCheckedChange={() => column.getFilterValue() ? column.setFilterValue("") : column.setFilterValue(field)}
                            checked={column.getFilterValue()?.toString() === field}
                        >
                            {field}
                        </DropdownMenuCheckboxItem>
                    ))}
                    <DropdownMenuCheckboxItem
                        onCheckedChange={() => column.getFilterValue() && column.setFilterValue("")}
                        checked={!column.getFilterValue()}
                    >
                        All
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                        <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Hide
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}