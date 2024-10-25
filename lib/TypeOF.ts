import { boolean } from "zod"

export type AttendList = {
    id: string,
    klass: string,
    student: {
      id: string,
      student_id: string,
      position: string | null,
      first_name: string,
      last_name: string | null,
      fathers_name: string,

  },
    presents: boolean,
    date: string,
    cause: string,
  }


  export type studentInfo = {
    id:string,
    admission_date:string,
    student_id: string,
    position: number | null,
    klass:string,
    full_klass:string,
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

  export type billSchema = 
  {
    id: string,
    student: string,
    student_name: string,
    fee: string,
    fee_title: string,
    fee_amount: number,
    paid: boolean,
    due_date:string,
    discount: number,
    get_payable_amount: number,
    trx: string,

  }

 export type PaymentSchema = {
  bill_ids: string[],
    status: "success" | "pending" | "hold" | "failed",
    paid_amount: number,
    mode: "cash" | "online" ,
 }

 export type PaymentType = {
  trx_id: string,
  bill_ids: string[],
    status: "success" | "pending" | "hold" | "failed",
    paid_amount: number,
    mode: "cash" | "online" ,
    get_total_amount: number,
    created_at: string,
  
 }

 export type AddStField = {
  id: string,
  title: string,
  field_type: 'file' | 'text' | 'number',
  required:boolean
 }