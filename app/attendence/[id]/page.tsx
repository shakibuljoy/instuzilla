'use client'

import * as React from "react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import useStudentList from "@/hooks/useStudentList"
import { z } from "zod"
import { AttendenceSchema } from "@/utils/formSchema"
import { setAttendence } from "@/utils/fetchAttendence"
import useFetchAttendence from "@/hooks/useFetchAttendence"
import { useToast } from "@/components/ui/use-toast"



export default function Page({params}:{params:{id:string}}) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const {attendenceList, setAttendenceList} = useFetchAttendence(params.id);
  const studentList = useStudentList(params.id);
  const {toast} = useToast();

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api,studentList])



  const presentHandle = async (values: z.infer<typeof AttendenceSchema>) => {
    const formData = new FormData()
    const safeValues = values as Record<string, any>;
    for (const key in safeValues) {
      formData.append(key, safeValues[key]);
    }
    if (values) {
      try {
        const response = await setAttendence(params.id, formData)
        if (response) {
          setAttendenceList(response)
        }
      } catch (error: any) {
        toast({
          variant:'destructive',
          title: "Error",
          description: error.message
        })
      } finally {
        api?.scrollNext();
      }
    }
  }

  function checkAttend(id: string) {
    return attendenceList.find(o => o.student.id === id) || null;
  }
  if(studentList?.length === 0){
    return (
      <h2 className="text-center items-center" >No student found!</h2>
    )
  }
  return (
    <div className="m-auto">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {studentList && studentList.map((student, index) => {
            const attendData = checkAttend(student.id);
            return (
              <CarouselItem key={index}>
                <Card className={`${attendData !== null ? attendData.presents ? "bg-blue-500" : "bg-red-500" : ""}`}>
                  <CardContent className="flex-col aspect-square space-y-4 items-center justify-center p-6">
                    <h1 className="text-3xl font-semibold">{student.first_name} {student.last_name && student.last_name}</h1>
                    <h1 className="text-xl font-semibold">Student Id: {student.student_id}</h1>
                    <h1 className="text-xl font-semibold">Mobile: {student.mobile}</h1>
                    {attendData && (
                      <div>
                        <h2 className="text-lg italic text-slate-50">Attendance Given </h2>
                        
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="grid grid-cols-3">
                    <Button
                      className="border border-dashed"
                      variant="default"
                      disabled={attendData !== null}
                      onClick={() => presentHandle({ presents: true, student: student.id.toString(), klass: student.klass })}
                    >
                      Present
                    </Button>
                    <div className="m-auto font-xl text-slate-50">
                      {attendData && <p>{attendData.presents ? "Present" : "Absent"}</p>}
                    </div>
                    <Button
                      className="border border-dashed"
                      variant="destructive"
                      disabled={attendData !== null}
                      onClick={() => presentHandle({presents: false, student: student.id, klass: student.klass })}
                    >
                      Absent
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <div className="py-2 text-center text-sm text-muted-foreground">
          Student {current} of {count}
        </div>
      </Carousel>
    </div>
  )
}
