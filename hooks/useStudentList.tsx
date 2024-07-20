'use client'

import { getStudentList } from '@/utils/fetchStudent';
import React, { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast';
import { studentInfo } from '@/lib/TypeOF';

export default function useStudentList(klass_id?:string) {
    const [studentList, setStudentList] = useState<studentInfo[] | null>(null);
    const {toast} = useToast();
    useEffect(() => {
        const getData = async () => {
          try{
            const data = await getStudentList(klass_id && klass_id);
          if(data as studentInfo[]){
            setStudentList(data)
          }else{
            setStudentList(null);
          }
    
          }catch(error:any){
            toast({
              variant:'destructive',
              title: "Error",
              description: error.message
            })
          }
          
        }
        getData()
      },[])

      return studentList;
}
