'use client'
import { useToast } from '@/components/ui/use-toast';
import React, { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogAction,AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PaymentSchema } from '@/lib/TypeOF';
import GreenTicks from './utils/GreenTicks';
import { initiateOnlinePayment, makePayment } from '@/utils/fetchBill';
import GrayTicks from './utils/GrayTicks';
import { useRouter } from 'next/navigation';

export default function OnlinePayamentCard({bills, children}:{bills:Record<string, any>[] | [], children:React.ReactNode}) {
    const {toast} = useToast();
    const [totalAmount, setTotalAmount] = useState(0);
    const [billIds, setBillIds] = useState<string[] | []>([])
    const router = useRouter()

    useEffect(() => {
      // Calculate total amount whenever `bills` changes
      const total = bills.reduce((acc, bill) => acc + bill.get_payable_amount, 0);
      const bill_ids = bills.map(bill => bill.id)
      setTotalAmount(total);
      setBillIds(bill_ids)
    }, [bills]);

    const paymentHandler = async (bill_details:PaymentSchema) => {
      if(bill_details){
        try{
          const postPayment = await initiateOnlinePayment(bill_details)
          console.log("postPayment", postPayment)
          if(postPayment.payment_url){
            toast({
              title: postPayment.status,
              variant: 'default',
              description: "Redirecting to Payment Gateway"
            })

            router.push(postPayment.payment_url)            
          }else{
            toast({
              title: "Payment Failed",
              variant: 'destructive',
              description: postPayment.detail
            })
          }
        }catch(err:any){
          toast({
            title: "Heads Up!",
            description: err.message,
            variant: "destructive"
          })
        }
       
      }
    }
  
  return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            {children}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Payment </AlertDialogTitle>
              <div>
                <ul className='max-w-md space-y-1'>
                {bills.length > 0 && bills.map((bill, index) => (
                  
                  <li className='flex items-center' key={index}>
                    {bill.paid ? <GrayTicks/> : <GreenTicks />}
                    {bill.fee_title}-{bill.fee_amount} {bill.paid && (<span className='animate-pulse text-red-600'>  (Bill already paid)</span>)}
                    </li>
              ))}
                </ul>
                
                
                <Label className='mb-6' >Total Amount:</Label>
                <Input readOnly  className='text-slate-950 text-lg'
                
                  value={totalAmount}/>
               
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className='bg-green-500' onClick={() => paymentHandler({bill_ids: billIds, status:'success', mode:"cash", paid_amount:totalAmount})} >Pay Now</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
  
}
