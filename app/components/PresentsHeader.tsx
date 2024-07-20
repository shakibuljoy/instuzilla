
import React from 'react'
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

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
        column: Column<TData, TValue>
        title: string,
    }

export function PresentsHeader<TData, TValue>({
    column,
    title,
    className
}: DataTableColumnHeaderProps<TData, TValue>){
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
                        {column.getIsSorted()  === "desc"? (
                            <ArrowUpIcon className="ml-2 h-4 w-4" />
                        ):(
                            <CaretSortIcon className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {[true, false].map((field, index) => (
                        <DropdownMenuCheckboxItem 
                        key={index}
                        onCheckedChange={() => column.getFilterValue()?column.setFilterValue(undefined):column.setFilterValue(field)}
                        checked={column.getFilterValue()===field || false}
                        >
                            
                            
                            {field ? 'Present' : 'Abscent'}
                        </DropdownMenuCheckboxItem>
                    ))}
                    

                    <DropdownMenuCheckboxItem 
                    onCheckedChange={() => column.setFilterValue(undefined)}
                    checked={column.getFilterValue() === undefined}
                    >
                        
                        
                        All
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => column.toggleVisibility(false)} >
                        <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Hide
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}