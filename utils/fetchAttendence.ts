"use server"
import { cookies } from "next/headers";

const baseUrl = 'http://127.0.0.1:8000';

export async function setAttendence( id:string, formData?: FormData){
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || null;
    if (token){
        try{
            if(formData !== undefined){
                const response = await fetch(`${baseUrl}/api/attendence/${id}/`, {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData
                });
    
                if(response.ok && response.status === 201){
                    const data = await response.json();
                    return data;
                }else{
                    const error = await response.json();
                    if (error.detail) {
                        throw new Error(error.detail)
                    } else {
                        // Handle field-specific errors
                        Object.keys(error).forEach((field) => {
                            throw new Error(`${error[field].join(' ')}`)
                        });
                    }
                }
            }else{
                const response = await fetch(`${baseUrl}/api/attendence/${id}/`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
    
                if(response.ok && response.status === 200){
                    const data = await response.json();
                    return data;
                }else{
                    const error = await response.json();
                    console.log(error)
                    if (error.detail) {
                        throw new Error(error.detail)
                    } else {
                        // Handle field-specific errors
                        Object.keys(error).forEach((field) => {
                            throw new Error(`${error[field].join(' ')}`)
                        });
                    }
                }
            }
           
        }catch(error:any){
            console.log(error)
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                // Handle field-specific errors
                Object.keys(error).forEach((field) => {
                    throw new Error(`${error[field].join(' ')}`)
                });
            }
        throw new Error(error.message || "Server connection failed")
        
    }
}}