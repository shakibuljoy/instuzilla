"use server"
import { cookies } from "next/headers";
import { formDataSubmit, getProtectedImage, simpleGETrequest, simplePOSTrequest } from "./commonFetch";

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
    const fullUrl = `${baseUrl}/api/students/${id}`
    const response = await simpleGETrequest(fullUrl)
    return response
}

export async function fetchClasses() {
    const fullUrl = `${baseUrl}/api/klasses`
    const response = await simpleGETrequest(fullUrl)
    return response
    
}


export async function getStudentImage(imageUrl: string) {
    const response = await getProtectedImage(imageUrl)
    return response
}

export async function registerStudent(formData: FormData, id:string | null=null) {
    let fullUrl
    if (id){
        fullUrl = `${baseUrl}/api/students/${id}/`
        const response = formDataSubmit(fullUrl,formData,"PATCH")
        return response
    }else{
        fullUrl = `${baseUrl}/api/students/`
        const response = formDataSubmit(fullUrl, formData, 'POST')
        return response
    }
}

export async function addStudentField() {
    const fullUrl = `${baseUrl}/api/add_st_field/`
    const response = await simpleGETrequest(fullUrl)
    return response
}

export async function submitAddStudentInfo(data: FormData) {
    const fullUrl = `${baseUrl}/api/add_st_info/`
    const response = formDataSubmit(fullUrl,data,'POST')
    return response
}

