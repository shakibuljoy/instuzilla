'use client'
import StudentRegisterForm from '@/app/components/StudentRegisterForm';
import useStudentInfo from '@/hooks/useStudentInfo'
import React from 'react'

export default function page({params}:{params: {id:string}}) {
  const {studentData, imageUrl, loading, error} = useStudentInfo(params.id);

  if (loading) {
    return <div>Loading...</div>;
  }else if(studentData){
    return (
      <StudentRegisterForm instance={studentData} instance_image={null} />
    )
  }
  return (
    <div className='m-auto mt-[50vh] font-bold text-red-500 text-3xl align-middle items-center' >{error ? error : "No student data available"}</div>
  )
  
  
}
