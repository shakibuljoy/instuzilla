'use client'
import StudentRegisterForm from '@/app/components/StudentRegisterForm';
import useStudentInfo from '@/hooks/useStudentInfo'
import React from 'react'

export default function page({params}:{params: {id:string}}) {
  const {studentData, imageUrl} = useStudentInfo(params.id);

  if (!studentData) {
    return <div>Loading...</div>; // Add a loading state
  }
  return (
    <StudentRegisterForm instance={studentData} instance_image={null} />
  )
}
