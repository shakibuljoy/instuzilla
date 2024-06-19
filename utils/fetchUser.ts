'use server'
import {SafeParseReturnType, z} from 'zod'
import { loginFormSchema, signupFormSchema } from './formSchema'
import { cookies } from 'next/headers'

interface LoginResponse {
    access: string,
    refresh: string
}

const baseUrl = 'http://127.0.0.1:8000'

export const loginUser = async (credentials:z.infer<typeof loginFormSchema>) => {
    const cookieStore = cookies();
    cookieStore.delete('token')
    cookieStore.delete('refresh')
    credentials.username = credentials.instu_id+'_'+credentials.username;
    const response = await fetch(`${baseUrl}/api/token/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })
        if (response.ok && response.status===200){
            const data = await response.json();
            cookieStore.set('token', data.access, {
                httpOnly: true, // Prevent JavaScript access
                maxAge: 60 * 15, // Fifteen Minuter
                sameSite: 'strict', // Mitigate CSRF risk
                secure: process.env.NODE_ENV === 'production', // Set Secure flag only in production
              });
            cookieStore.set('refresh', data.refresh, {
                httpOnly: true, // Prevent JavaScript access
                maxAge: 60 * 60 * 9, // Nine Hour
                sameSite: 'strict', // Mitigate CSRF risk
                secure: process.env.NODE_ENV === 'production', // Set Secure flag only in production
              });
            return data;
        }else if(response.status > 201){
            const error = await response.json()
            throw new Error(error.detail)
        }
        else{
            throw new Error("Something went wrong!")
        }
        
}   


export const registerUser = async (credentials:z.infer<typeof signupFormSchema>) => {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || null;
    if (token){
        const parsedData = signupFormSchema.safeParse(credentials) !== undefined && signupFormSchema.safeParse(credentials);
        if(parsedData){
            const response = await fetch(`${baseUrl}/api/register/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parsedData.data)
            }).catch(err => {throw new Error(err)})
            // if (response.ok && response.status===201){
            //     const data = await response.json()
            //     return data;
            // }else{
            //     cookieStore.delete('token');
            //     return response;
            // }
            const data = await response.json()
            return data
        }
        }
        
    return null;
}

export const gettingUser = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || null;
    if (token){
        const response = await fetch(`${baseUrl}/api/verify-user/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        if (response.ok && response.status===200){
            const data = await response.json()
            return data;
        }else{
            cookieStore.delete('token');
            return null;
        }
    }
    return null;
}

export const verifyingUser = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || null;
    if (token){
        const response = await fetch(`${baseUrl}/api/verify-user/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        if (response.ok && response.status===200){
            const data = await response.json()
            return data;
        }else{
            return null;
        }
    }
    return null;
}


export const updateUser = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('refresh')?.value || null;
    if (token){
        const response = await fetch(`${baseUrl}/api/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({refresh:token})
        })
        if (response.ok && response.status===200){
            const data = await response.json();
            cookieStore.set('token', data.access, {
                httpOnly: true, // Prevent JavaScript access
                maxAge: 60 * 15, // Fifteen Minuter
                sameSite: 'strict', // Mitigate CSRF risk
                secure: process.env.NODE_ENV === 'production', // Set Secure flag only in production
              });
            cookieStore.set('refresh', data.refresh, {
                httpOnly: true, // Prevent JavaScript access
                maxAge: 60 * 60 * 9, // Nine Hour
                sameSite: 'strict', // Mitigate CSRF risk
                secure: process.env.NODE_ENV === 'production', // Set Secure flag only in production
              });
              return data;
        }else{
            cookieStore.delete('token');
            cookieStore.delete('refresh')
            return null;
        }
    }
    return null;
}

export const logOutUser = () => {
    const cookieStore = cookies();
    const token = cookieStore.get('refresh')?.value || null;

    if(token){
        cookieStore.delete('refresh')
        cookieStore.delete('token')
        return true;
    }else{
        return false;
    }
}