'use client'
import Image from 'next/image'
import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from '@/components/ui/use-toast';
import useStudentInfo from '@/hooks/useStudentInfo';

export default function Page({ params }: { params: { id: string } }) {
  const {toast} = useToast();
  const {studentData, imageUrl, loading, error} = useStudentInfo(params.id);



  
 
  if(studentData){
    return (
      <div className="container max-w-[700px] mx-auto my-8 p-4">
        <Card id='pdf'>
          <CardHeader>
            <CardTitle className='text-indigo-500' >{studentData.first_name} {studentData.last_name}</CardTitle>
            <CardDescription>
  
            {imageUrl && <Image width={80} height={80} src={imageUrl} alt='student picture' />}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className=" grid grid-cols-2 space-x-2">
              <div className='space-y-2'>
                <h3 className="font-semibold text-lg text-slate-400">Personal Information</h3>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Student ID:</strong> {studentData.student_id}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Class:</strong> {studentData.full_klass}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>First Name:</strong> {studentData.first_name}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Last Name:</strong> {studentData.last_name}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Mobile:</strong> {studentData.mobile}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>{"Mother's Name:"}</strong> {studentData.mothers_name}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>{"Father's Name:"}</strong> {studentData.fathers_name}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Address:</strong> {studentData.address}</p>
              </div>
              <div className='space-y-2'>
                <h3 className="font-semibold text-lg text-slate-400">Additional Information</h3>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Admission Date:</strong> {studentData.admission_date}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Date of Birth:</strong> {studentData.birth_date}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Birth Certificate No:</strong> {studentData.birth_certificate_no}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>NID No:</strong> {studentData.nid_no}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Institute:</strong> {studentData.institute}</p>
                <p className='p-2 bg-slate-50 border border-indigo-500 rounded-md text-indigo-700'><strong>Position:</strong> {studentData.position}</p>
                
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
