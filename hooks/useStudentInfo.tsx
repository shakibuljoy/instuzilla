'use client'
import { getStudentImage, getStudentInfo } from '@/utils/fetchStudent'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast';
import { studentInfo } from '@/lib/TypeOF';



export default function useStudentInfo(id:string) {
  const {toast} = useToast();
  const [student, setStudent] = useState<studentInfo | null>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const getStudent = async () => {
      setLoading(true);
      setError("")
      try {
        const studentResponse = await getStudentInfo(id)
        if (studentResponse) {
          setStudent(studentResponse)
          setLoading(false);
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        })
        setError(error.message)
        setLoading(false)
      } finally{
        setError("");
        setLoading(false);
      }
    }
    getStudent()
  }, [id])

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
  return {
    studentData:student,
    imageUrl:imageUrl,
    loading:loading,
    error: error
  }
}
