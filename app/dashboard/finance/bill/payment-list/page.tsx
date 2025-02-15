'use client'
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { useFetchUserCreatedPayment } from "@/hooks/useFetchBill";
import { PaymentSchema } from "@/lib/TypeOF";



export default function Page() {
  const {paymentList, loading}: { paymentList: PaymentSchema[], loading:boolean } = useFetchUserCreatedPayment()




  return (
    <div className="container mx-auto py-10">
      
      {
        paymentList.length > 0 || loading ? (
            <DataTable columns={columns} data={paymentList} />
          
        ) : (
          <h1 className="text-center">No Bill data available to show!</h1>
        )}
    </div>
  );
}
