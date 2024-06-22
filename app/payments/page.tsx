
import { Payment, columns } from "./columns"
import { payments } from "./paymentData"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    ...payments
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10  ">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
