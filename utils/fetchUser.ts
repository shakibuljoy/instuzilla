'use server'
import {z} from 'zod'
import { loginFormSchema } from './formSchema'
export const loginUser = async (credentals:z.infer<typeof loginFormSchema>) => {
    const response = await fetch('http://127.0.0.1:8000/api/token/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentals)
    })
    if (response.ok){
        const data = await response.json()
        return data
    }else{
        throw new Error("Credentials Invalid!")
    }
}
