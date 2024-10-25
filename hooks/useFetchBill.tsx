import { useToast } from '@/components/ui/use-toast'
import { billSchema, PaymentSchema } from '@/lib/TypeOF'
import { fetchIndiBill, fetchStudentBill, fetchUserCreatedPayment } from '@/utils/fetchBill'
import React, { useState } from 'react'

export default function useFetchBill(student_id:string) {
    const [billList, setBillList] = useState<billSchema[] | []>([])
    const {toast} = useToast()

    const getStudentBill = async (student_id:string) => {
      
      try{
        const bills = await fetchStudentBill(student_id)
      if(bills){
        setBillList(bills)
      }
      }catch(error:any){
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message
        })
      }
      
    } 
    const refreshData = () => {
      getStudentBill(student_id);
    }
    React.useEffect(() => {
      if(student_id){
        
        getStudentBill(student_id);
      
      }
        },[student_id])
  return (
    {
        billList:billList,
        setBillList:setBillList,
        refreshData:refreshData
    }
  )
}



export function useIndiBill(bill_id:string) {
  const [bill, setBill] = useState<billSchema | null>(null)
  const {toast} = useToast()

  const getIndiBill = async (bill_id:string) => {
    
    try{
      const bill = await fetchIndiBill(bill_id)
    if(bill){
      setBill(bill)
    }
    }catch(error:any){
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message
      })
    }
    
  } 

  React.useEffect(() => {
    if(bill_id){
      
      getIndiBill(bill_id);
    
    }
      },[bill_id])
return (
  {
      bill:bill,
      setBill:setBill,
  }
)
}

export function useFetchUserCreatedPayment() {
  const [paymentList, setPaymentList] = useState<PaymentSchema[] | []>([])
  const {toast} = useToast()

  const getPayment = async () => {
    
    try{
      const payments = await fetchUserCreatedPayment()
    if(payments){
      setPaymentList(payments)
    }
    }catch(error:any){
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message
      })
    }
    
  } 

  React.useEffect(() => {
    getPayment()
  },[])
return (
  {
      paymentList:paymentList,
      setPaymentList:setPaymentList,
  }
)
}