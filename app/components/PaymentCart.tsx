'use client'
import { useToast } from '@/components/ui/use-toast';
import React, { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogAction,AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PaymentSchema } from '@/lib/TypeOF';
import GreenTicks from './utils/GreenTicks';
import { makePayment } from '@/utils/fetchBill';
import GrayTicks from './utils/GrayTicks';

export default function PyamentCard({bills, children}:{bills:Record<string, any>[] | [], children:React.ReactNode}) {
    const {toast} = useToast();
    const [totalAmount, setTotalAmount] = useState(0);
    const [billIds, setBillIds] = useState<string[] | []>([])

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
          const data = await makePayment(bill_details)
          if(data.success){
            toast({
              title: data.success.status,
              variant: 'default',
              description: data.success.status === 'success' ? `Successfully Paid ${data.success.paid_amount}`: "Try Again Later!"
            })
            
          }else{
            toast({
              title: "Payment Failed",
              variant: 'destructive',
              description: data.error
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
