"use client";
import React, {useEffect, useMemo, useState } from "react";
import { PopupDetails } from "./PopupDetails";
import { ArrowLeftCircle, ArrowRightCircle, Key } from "lucide-react";

type LeaveType = {
  date: string;
  type: "present" | "holiday" | "abscent" | "leave" | "weekend";
  cause: string | null;
}
export default function Calendar({leave_days, setDate, date}:{leave_days:LeaveType[], setDate:React.Dispatch<React.SetStateAction<{month:string, year:number, numberMonth:number}>>, date:{month:string, year:number, numberMonth:number}}) {
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  useEffect(() => {
    setDate({...date, year: year, numberMonth: month});
  }, [year, month]);
  
  const abscentChecker = useMemo(() => {
   const AbscentDetails:{days:number[],months:number[],years:number[]} = {
    days: [],
    months: [],
    years: []
   }
   leave_days.map(dateString => {
    if (dateString.type !== 'present') {
      const parts = dateString.date.split('-'); // Split the string by '-'
        AbscentDetails.days.push(parseInt(parts[0], 10)); // Parse the second part (days) as an integer
        AbscentDetails.months.push(parseInt(parts[1], 10)); // Parse the second part (months) as an integer
        AbscentDetails.years.push(parseInt(parts[2], 10)); // Parse the second part (years) as an integer
    }
        
    });
    return AbscentDetails;
  },[leave_days])

  // Create a date object for the first day of the specified month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // All month names definations
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Calculate the day of the week for the first day of the month (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const dayColors = (status: LeaveType["type"]) => {
    switch (status) {
      case "abscent":
        return "bg-red-500 bg-opacity-5 text-red-500"
      case "holiday":
        return "bg-gray-500 bg-opacity-5 text-gray-500"
      case "weekend":
        return "bg-gray-500 bg-opacity-5 text-gray-500"
      case "leave":
        return "bg-orange-700 bg-opacity-5 text-red-500"
      case "present":
        return "bg-green-500 bg-opacity-5 text-green-500"
      default:
        return null;

    }
  }

  const memoEmptyBoxes = useMemo(() =>
    Array.from({ length: firstDayOfWeek }, (_, index) => (
      <div key={index} className="py-2 border cursor-pointer"></div>
    )), [month])
    const memoBoxesOfDays = useMemo(() => 
      Array.from({ length: daysInMonth }, (_, index) => {
        // Calculate the date for the current iteration
        const dayOfMonth = index + 1;
    
        // Check if this date is the current date
        const isCurrentDate = dayOfMonth === currentDate.getDate() && month === currentMonth && year === currentYear;

        // Check if this date is Abscent 
        const formattedDate = `${dayOfMonth <10? `0${dayOfMonth}`: dayOfMonth}-${month <10? `0${month+1}`: month+1}-${year}`;
        const foundLeaveDay = leave_days.find(leaveDay => leaveDay.date === formattedDate);
        const isAbscent = {
          status: foundLeaveDay,
          type: foundLeaveDay && foundLeaveDay.type,
          cause: foundLeaveDay && foundLeaveDay.cause && foundLeaveDay.cause 
        } ;

        // Check if this date is weekend for "Friday", "SaturDay" 
        // const data = (((firstDayOfWeek+1) +dayOfMonth)%7);
        // const isWeekend = data===0||data===1
        return (
          <PopupDetails key={index}
          title={isAbscent.status && isAbscent.type || ''}
          description={` ${isAbscent.status ? "He/She is "+ isAbscent.type : "Attendence not found"} on ${formattedDate}`}
          status={isAbscent.status && isAbscent.type? isAbscent.type: "present"}
          >
            <div key={index} className={`text-center py-2 border cursor-pointer ${isAbscent.status && isAbscent.type ?  dayColors(isAbscent.type):''}  ${isCurrentDate && "rounded-full border-violet-600"}`}>
            {dayOfMonth}
          </div>
          </PopupDetails>
          
        );
      }), [month, daysInMonth, currentDate, year]);


// Days of the week
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // Event listeners for previous and next month buttons
  const prevMonth = () => {
    setMonth((curr) => --curr < 0 ? 11 : curr);
    setYear((curr) => month === 0 ? --curr : curr);
  };

  const nextMonth = () => {
    setMonth((curr) => ++curr > 11 ? 0 : curr);
    setYear((curr) => month === 11 ? ++curr : curr);
  };

  return (
    <div className="bg-transparent flex items-center justify-center">
      <div className="lg:w-8/12 md:w-9/12 w-full mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className={`flex items-center justify-between px-6 py-3 ${abscentChecker.months.indexOf(month+1)+1 >0 && abscentChecker.years.indexOf(year)+1 >0 ? "bg-red-700": "bg-gray-700"}`}>
            <button onClick={prevMonth} id="prevMonth" className="text-white text-sm md:text-xl">
            <ArrowLeftCircle/>
            </button>
            <h2
              id="currentMonth"
              className="text-white text-md md:text-xl"
            >{`${monthNames[month]} ${year}`}</h2>
            <button onClick={nextMonth} id="nextMonth" className="text-white text-sm md:text-xl">
              <ArrowRightCircle/>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 p-4">
            {/* Calendar Days Go Here */}

            {daysOfWeek.map((day, index) => (
              
              <div key={index} className="text-center font-semibold">{day}</div>
            ))}
            {/* Create empty boxes for days before the first day of the month */}
            {memoEmptyBoxes}

            {/* Create days for specific month */}

            {memoBoxesOfDays}
          </div>
          
        </div>
      </div>
    </div>
  );
}
