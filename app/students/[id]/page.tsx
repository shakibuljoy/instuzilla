'use client'
import { getStudentImage, getStudentInfo } from '@/utils/fetchStudent'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from '@/components/ui/use-toast';

export type studentInfo = {
  id:string,
  student_id: string,
  position: number | null,
  klass:string,
  image: string,
  image_url: string | null,
  first_name: string,
  last_name: string,
  mobile: string,
  mothers_name: string,
  fathers_name: string,
  address: string,
  birth_date: string,
  birth_certificate_no: string,
  nid_no: string | null,
  institute: string
}

export default function Page({ params }: { params: { id: string } }) {
  const {toast} = useToast();
  const [student, setStudent] = useState<studentInfo | null>(null);
  const [imageUrl, setImageUrl] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const getStudent = async () => {
      setError("")
      try {
        const studentResponse = await getStudentInfo(params.id)
        if (studentResponse) {
          setStudent(studentResponse)
        }else{
          setStudent(null);
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        })
        setError(error.message)
        setStudent(null);
      }
    }
    getStudent()
  }, [params.id])

  useEffect(() => {
    const getImage = async (imageUrl: string) => {
      setError("")
      try {
        const imageResponse = await getStudentImage(imageUrl)
        if (imageResponse) {
          setImageUrl(imageResponse)
        }
      } catch (error: any) {
        setError(error.message)
      }
    }

    if (student?.image_url) {
      getImage(student.image_url)
    }
  }, [student])
 
  if(student){
    return (
      <div className="container max-w-[700px] mx-auto my-8 p-4">
        <Card>
          <CardHeader>
            <CardTitle className='text-indigo-500' >{student.first_name} {student.last_name}</CardTitle>
            <CardDescription>
  
            {imageUrl && <Image width={80} height={80} src={imageUrl} alt='student picture' />}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className=" grid grid-cols-2 space-x-2">
              <div className='space-y-2'>
                <h3 className="font-semibold text-lg text-slate-400">Personal Information</h3>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Student ID:</strong> {student.student_id}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Class:</strong> {student.klass}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>First Name:</strong> {student.first_name}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Last Name:</strong> {student.last_name}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Mobile:</strong> {student.mobile}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Mother's Name:</strong> {student.mothers_name}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Father's Name:</strong> {student.fathers_name}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Address:</strong> {student.address}</p>
              </div>
              <div className='space-y-2'>
                <h3 className="font-semibold text-lg text-slate-400">Additional Information</h3>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Date of Birth:</strong> {student.birth_date}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Birth Certificate No:</strong> {student.birth_certificate_no}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>NID No:</strong> {student.nid_no}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Institute:</strong> {student.institute}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Position:</strong> {student.position}</p>
                
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
    
  return (<div className="m-auto mt-[50vh] justify-center items-center h-screen">
      <p className='text-red-500 font-bold text-3xl'>{error}</p>
    </div>)
 
  
}
