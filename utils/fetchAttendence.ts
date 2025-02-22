"use server"
import { SingleAttend } from "@/lib/TypeOF";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAttendence(id: string, formData?: SingleAttend[], date?: string) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || null;
  if (token) {
    try {
      if (formData !== undefined) {
        const response = await fetch(`${baseUrl}/api/attendence/${id}/`, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok && response.status === 201) {
          const data = await response.json();
          return { success: data };
        } else {
          const error = await response.json();
          return { error: error.detail || "Something Went wrong!" };
        }
      } else {
        const dateUrlgenerator = (date?: string) => {
          if (date !== undefined) {
            return `${baseUrl}/api/attendence/${id}?date=${date}`
          } else {
            return `${baseUrl}/api/attendence/${id}/`
          }
        }
        const response = await fetch(dateUrlgenerator(date), {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok && response.status === 200) {
          const data = await response.json();
          return { success: data };
        } else {
          const error = await response.json();
          return { error: error.detail || "Server connection failed" };
        }
      }

    } catch (error: any) {
      return { error: error.message || "Something Went Wrong!" };
    }
  } else {
    return { error: 'Token not found' };
  }
}

export async function fetchEditAttendence(id: string, formData?: FormData) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || null;
  if (token) {
    try {
      if (formData !== undefined) {
        const response = await fetch(`${baseUrl}/api/edit-attendence/${id}/`, {
          method: "PATCH",
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData
        });

        if (response.ok && (response.status === 201 || response.status === 200)) {
          const data = await response.json();
          return { success: data };
        } else {
          const error = await response.json();
          return { error: error.detail || "Something Went wrong!" };
        }
      } else {
        const response = await fetch(`${baseUrl}/api/edit-attendence/${id}/`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok && (response.status === 200 || response.status === 201)) {
          const data = await response.json();
          return { success: data };
        } else {
          const error = await response.json();
          return { error: error.detail || "Server connection failed" };
        }
      }

    } catch (error: any) {
      return { error: error.message || "Something Went Wrong!" };
    }
  } else {
    return { error: 'Token not found' };
  }
}

export async function fetchStudentAttendance(id: string, month: number, year: string) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || null;
  if (token) {
    try {
      const response = await fetch(`${baseUrl}/api/student-attendance/${id}/?month=${month}&year=${year}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok && response.status === 200) {
        const data = await response.json();
        return { success: data };
      } else {
        const error = await response.json();
        return { error: error.detail || "Server connection failed" };
      }

    } catch (error: any) {
      return { error: error.message || "Something Went Wrong!" };
    }
  } else {
    return { error: 'Token not found' };
  }
}