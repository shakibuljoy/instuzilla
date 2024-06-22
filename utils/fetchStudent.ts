"use server"
import { cookies } from "next/headers";

const baseUrl = 'http://127.0.0.1:8000'
export async function getStudentInfo(id: string){
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || null; 
    try {
        const response = await  fetch(`${baseUrl}/api/students/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        if(!response.ok){
            const error = await response.json()
            throw new Error(error.detail)
        }else if(response.ok && response.status==200){
            const data = await response.json()
            return data
        }

        
    }catch(error:any){
        throw new Error(error.message)
    }
}
export async function getStudentImage(imageUrl:string){

   const cookieStore = cookies();
   const token = cookieStore.get('token')?.value || null;
   try {
    const response = await fetch(imageUrl,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if(!response.ok){
            const error = await response.json()
            throw new Error(error.detail)
        }

        const buffer = await response.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const mimeType = response.headers.get('content-type')
        const dataUrl = `data:${mimeType};base64,${base64}`;
        
        return dataUrl 
   }catch(error:any) {
    throw new Error(error.message)
   }

   

}