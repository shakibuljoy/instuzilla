'use server'
import { cookies } from "next/headers";
export async function publicRequest(baseUrl: string){
          try {
                const response = await fetch(baseUrl, {
                    method: "GET",
                    
                    headers: {
                        'Content-Type': 'application/json'
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
}
export async function publicGetRequest(baseUrl: string){
          try {
            const response = await fetch(baseUrl, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
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
}


export async function simpleGETrequest(baseUrl: string){
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || null;
    if (token){
          try {
            const response = await fetch(baseUrl, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
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


export async function simplePOSTrequest(baseUrl: string, data:object){
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || null;
    if (token){
          try {
            const response = await fetch(baseUrl, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if(response.ok){
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

export async function publicFormDataSubmit(baseUrl: string, formData:FormData, requestType: 'POST' | 'PATCH' | 'PUT'){
  

        try {
                const response = await fetch(baseUrl, {
                    method: requestType,
                    body: formData
                });
                if (response.ok) {
                    const data = await response.json();
                    return data;
                // } else if (response.status === 400) {
                //     throw new Error("Please filled up all of required fields")
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'An error occurred');
                }

               
            
        } catch (error: any) {
            throw new Error(error.message || 'An error occurred');
        }
    }

export async function formDataSubmit(baseUrl: string, formData:FormData, requestType: 'POST' | 'PATCH' | 'PUT'){
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || null;

    if (token) {
        try {
                const response = await fetch(baseUrl, {
                    method: requestType,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData
                });
                if (response.ok) {
                    const data = await response.json();
                    return data;
                // } else if (response.status === 400) {
                //     throw new Error("Please filled up all of required fields")
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'An error occurred');
                }

               
            
        } catch (error: any) {
            throw new Error(error.message || 'An error occurred');
        }
    } else {
        throw new Error('Token not found');
    }}


export async function getProtectedImage(imageUrl: string) {
        const cookieStore = cookies();
        const token = cookieStore.get('token')?.value || null;
        try {
            const response = await fetch(imageUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail);
            }
    
            const buffer = await response.arrayBuffer();
            const base64 = Buffer.from(buffer).toString('base64');
            const mimeType = response.headers.get('content-type');
            const dataUrl = `data:${mimeType};base64,${base64}`;
    
            return dataUrl;
        } catch (error: any) {
            throw new Error(error);
        }
    }