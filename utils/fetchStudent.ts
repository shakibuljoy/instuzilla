"use server"
import { cookies } from "next/headers";
import { formDataSubmit, getProtectedImage, publicFormDataSubmit, publicGetRequest, publicRequest, simpleGETrequest, simplePOSTrequest } from "./commonFetch";

const baseUrl = 'http://3.111.34.12/';
const instu_id = 'uphsc';

export async function getStudentList(klass_id?: string) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || null;
    try {
        const response = await fetch(`${baseUrl}/api/students${klass_id ? '?klass=' + klass_id : ''}`, {
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
    const fullUrl = `${baseUrl}/api/students/${id}`;
    const response = await simpleGETrequest(fullUrl);
    return response;
}

export async function fetchClasses() {
    
    const fullUrl = `${baseUrl}/api/klasses?instu_id=${instu_id}`;
    const response = await publicRequest(fullUrl);
    return response;
}

export async function getStudentImage(imageUrl: string) {
    const response = await getProtectedImage(imageUrl);
    return response;
}

export async function registerStudent(formData: FormData, id: string | null = null) {
    let fullUrl;
    if (id) {
        fullUrl = `${baseUrl}/api/students/${id}?instu_id=${instu_id}`;
        const response = formDataSubmit(fullUrl, formData, "PATCH");
        return response;
    } else {
        fullUrl = `${baseUrl}/api/students/?instu_id=${instu_id}`;
        const response = publicFormDataSubmit(fullUrl, formData, 'POST');
        return response;
    }
}

export async function addStudentField() {
    const fullUrl = `${baseUrl}/api/add_st_field/?instu_id=${instu_id}`;
    const response = await publicGetRequest(fullUrl);
    return response;
}

export async function submitAddStudentInfo(data: FormData) {
    const fullUrl = `${baseUrl}/api/add_st_info/`;
    const response = publicFormDataSubmit(fullUrl, data, 'POST');
    return response;
}

export async function subjectList(student_id: string) {
    const fullUrl = `${baseUrl}/api/get-subjects/?student_id=${student_id}`;
    const response = await publicGetRequest(fullUrl);
    return response;
}

export async function submitMarks(data: FormData) {
    const fullUrl = `${baseUrl}/api/submit-marks/`;
    const response = formDataSubmit(fullUrl, data, 'POST');
    return response;
}

export async function markSheet(student_id: string, klass_id: string) {
    const fullUrl = `${baseUrl}/api/get-marks/?student_id=${student_id}&instu_id=${instu_id}&klass_id=${klass_id}`;
    const response = await publicGetRequest(fullUrl);
    return response;
}
