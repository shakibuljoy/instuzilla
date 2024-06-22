'use client'
import { getStudentImage, getStudentInfo } from '@/utils/fetchStudent'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type studentInfo = {
  id: string,
  image: string,
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
  const [student, setStudent] = useState<studentInfo>({
    id: "",
    image: "",
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
        const studentResponse = await getStudentInfo(params.id)
        if (studentResponse) {
          setStudent(studentResponse)
        }
      } catch (error: any) {
        setError(error.message)
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

    if (student.image) {
      getImage(student.image)
    }
  }, [student.image])

  return (
    <>
      <div>Student Id is {params.id}</div>
      <h1>{student.first_name}</h1>
      {error.length > 0 && <h1>{error}</h1>}
      {imageUrl && <Image width={200} height={200} src={imageUrl} alt='student picture' />}
    </>
  )
}
