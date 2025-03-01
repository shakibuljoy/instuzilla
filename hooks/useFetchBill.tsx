import { useToast } from '@/components/ui/use-toast'
import { billSchema, PaymentSchema } from '@/lib/TypeOF'
import { fetchIndiBill, fetchStudentBill, fetchUserCreatedPayment } from '@/utils/fetchBill'
import React, { useState } from 'react'

export default function useFetchBill(student_id:string) {
    const [billList, setBillList] = useState<billSchema[] | []>([])
    const [loading, setLoading] = useState(false);
    const {toast} = useToast()

    const getStudentBill = async (student_id:string) => {
      setLoading(true);
      
      try{
        const data = await fetchStudentBill(student_id)
      if(data.success){
        setBillList(data.success)
      }else{
        toast({
          variant: 'destructive',
          title: 'Error',
          description: data.error
        })
      }
      }catch(error:any){
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message
        })
      }finally{
        setLoading(false);
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
        refreshData:refreshData,
        loading: loading,
    }
  )
}



export function useIndiBill(bill_id:string) {
  const [bill, setBill] = useState<billSchema | null>(null)
  const {toast} = useToast()

  const getIndiBill = async (bill_id:string) => {
    
    try{
      const data = await fetchIndiBill(bill_id)
    if(data.success){
      setBill(data.success) 
    }else{
      toast({
        variant: 'destructive',
        title: 'Error',
        description: data.error
      })
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
  const [loading, setLoading] = useState(false);
  const {toast} = useToast()

  const getPayment = async () => {
    setLoading(true);
    
    try{
      const data = await fetchUserCreatedPayment()
    if(data.success){
      setPaymentList(data.success)
    }
    }catch(error:any){
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message
      })
    }finally{
      setLoading(false);
    }
    
  } 

  React.useEffect(() => {
    getPayment()
  },[])
return (
  {
      paymentList:paymentList,
      setPaymentList:setPaymentList,
      loading:loading
  }
)
}