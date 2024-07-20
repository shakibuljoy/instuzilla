"use server"
import { cookies } from "next/headers";

const baseUrl = 'http://127.0.0.1:8000';
export async function getStudentList(klass_id?:string) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || null;
    try {
        const response = await fetch(`${baseUrl}/api/students${klass_id? '?klass='+klass_id:''}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail);
        } else if (response.ok && response.status === 200) {
            const data = await response.json();
            return data;
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getStudentInfo(id: string) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || null;
    try {
        const response = await fetch(`${baseUrl}/api/students/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail);
        } else if (response.ok && response.status === 200) {
            const data = await response.json();
            return data;
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function fetchClasses() {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || null;
    try {
        const response = await fetch(`${baseUrl}/api/klasses`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail);
        }

        const data = await response.json();

        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}


export async function getStudentImage(imageUrl: string) {
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

export async function registerStudent(formData: FormData, id:string | null=null) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || null;

    if (token) {
        try {
            if(id){
                const response = await fetch(`${baseUrl}/api/students/${id}/`, {
                    method: "PATCH",
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

            }else{
                const response = await fetch(`${baseUrl}/api/students/`, {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData
                });
                
                if (response.ok) {
                    const data = await response.json();
                    return data;
                } else if (response.status === 400) {
                    throw new Error("Please filled up all of required fields")
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'An error occurred');
                }
    
            }
            
        } catch (error: any) {
            throw new Error(error.message || 'An error occurred');
        }
    } else {
        throw new Error('Token not found');
    }
}

