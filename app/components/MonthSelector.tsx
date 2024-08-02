"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

export function MonthPicker({date, setDate}:{date:{month:string,year:number, numberMonth:number}, setDate:React.Dispatch<React.SetStateAction<{
    month: string;
    year: number;
    numberMonth: number;
}>>}) {


    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal p-1",
            !date && "text-muted-foreground"
          )}
        >
            <div className="flex">
                
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? date.month+`'`+date.year.toString().slice(2) : <span>Pick a month</span>}
            </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex flex-col shadow-md rounded-sm border border-slate-300 p-2" >
            <div className="flex justify-between border-b-2">
                <Button
                size={'sm'}
                variant={'ghost'}
                onClick={() => setDate({...date, year: date.year - 1})}
                >
                    <ArrowLeftIcon />
                </Button>
                <span className="text-xl px-2" >{date?.year}</span>
                <Button 
                variant={'ghost'}
                size={'sm'}
                onClick={() => setDate({...date, year: date.year + 1})}
                >
                    <ArrowRightIcon />
                </Button>
            </div>
            <div className="grid grid-cols-3">
                {months.map((month,index) => (
                    <Button onClick={() => setDate({...date, month:month, numberMonth:index})} size={'sm'} variant='ghost' key={index}>{month.slice(0,3)}</Button>
                ))}
            </div>

        </div>
      </PopoverContent>
    </Popover>
  )
}
