import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
export default function NavDropDown({label, items}:{label:string, items: React.ReactNode[] }) {
  return (
    <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-md">
                {label}
                <span className="sr-only">Toggle user menu</span>
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{label}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {items.map((item, index) => (
                    <DropdownMenuItem key={index}>{item}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
  )
}
