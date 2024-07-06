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

export default function useStudentInfo(id:string) {
  const {toast} = useToast();
  const [student, setStudent] = useState<studentInfo>({
    id:"",
    student_id: "",
    position: null,
    klass:"",
    image: "",
    image_url:null,
    first_name: "",
    last_name: "",
    mobile: "",
    mothers_name: "",
    fathers_name: "",
    address: "",
    birth_date: "",
    birth_certificate_no: "",
    nid_no: null,
    institute: ""
  })
  const [imageUrl, setImageUrl] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const getStudent = async () => {
      setError("")
      try {
        const studentResponse = await getStudentInfo(id)
        if (studentResponse) {
          setStudent(studentResponse)
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        })
        setError(error.message)
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

    if (student.image_url) {
      getImage(student.image_url)
    }
  }, [student.image])
  return {
    studentData:student,
    imageUrl:imageUrl
  }
}
