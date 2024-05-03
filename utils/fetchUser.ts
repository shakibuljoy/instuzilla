'use server'
import {z} from 'zod'
import { loginFormSchema } from './formSchema'
import { cookies } from 'next/headers'

interface LoginResponse {
    access: string,
    refresh: string
}
export const loginUser = async (credentals:z.infer<typeof loginFormSchema>) => {
    const cookieStore = cookies();
    cookieStore.delete('token')
    const response = await fetch('http://127.0.0.1:8000/api/token/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentals)
    })
        if (response.ok && response.status===200){
            const data = await response.json();
            cookieStore.set('token', data.access, {
                httpOnly: true, // Prevent JavaScript access
                maxAge: 60 * 60, // One hour (consider adjusting based on your requirements)
                sameSite: 'strict', // Mitigate CSRF risk
                secure: process.env.NODE_ENV === 'production', // Set Secure flag only in production
              });
              return data;
        }else{
            throw new Error("Something went wrong!")
        }
            
}   
  
