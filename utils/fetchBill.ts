"use server"
import { PaymentSchema } from "@/lib/TypeOF";
import { cookies } from "next/headers";
import { simpleGETrequest, simplePOSTrequest } from "./commonFetch";

const baseUrl = 'http://127.0.0.1:8000';

export async function fetchStudentBill(id:string) {
    const fullUrl = `${baseUrl}/finance/student-bills/${id}`
    const response = await simpleGETrequest(fullUrl)
    return response
}


export async function fetchIndiBill( id:string){
    // Get Individual billl by bill id
    const fullUrl = `${baseUrl}/finance/bill/${id}`
    const response = await simpleGETrequest(fullUrl)
    return response
}

export async function makePayment(bill_details:PaymentSchema){
    const fullUrl = `${baseUrl}/finance/payment/`
    const response = await simplePOSTrequest(fullUrl, bill_details)
    return response
    
}

export async function initiateOnlinePayment(bill_details:PaymentSchema){
    const fullUrl = `${baseUrl}/finance/online-payment/`
    const response = await simplePOSTrequest(fullUrl, bill_details)
    return response
    
}

export async function fetchUserCreatedPayment(){
    const fullUrl = `${baseUrl}/finance/user-created-payment/`
    const response = await simpleGETrequest(fullUrl)
    return response
}