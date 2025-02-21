'use server'
import { cookies } from "next/headers";

class ClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClientError";
  }
}

async function handleResponse(response: Response) {
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const error = await response.json();
    console.error('Error response:', error);
    if (error.detail) {
      throw new ClientError(error.detail);
    } else {
      // Handle field-specific errors
      Object.keys(error).forEach((field) => {
        throw new ClientError(`${error[field].join(' ')}`);
      });
    }
    throw new ClientError("An error occurred");
  }
}

export async function publicRequest(baseUrl: string, cacheData: 'no-store' | 'default' = 'default') {
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      cache: cacheData
    });
    return await handleResponse(response);
  } catch (error: any) {
    console.error('Error in publicRequest:', error);
    throw new ClientError(error.message || "Server connection failed");
  }
}

export async function publicGetRequest(baseUrl: string) {
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return await handleResponse(response);
  } catch (error: any) {
    console.error('Error in publicGetRequest:', error);
    throw new ClientError(error.message || "Server connection failed");
  }
}

export async function simpleGETrequest(baseUrl: string, cacheData: 'no-store' | 'default' = 'default') {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || null;
  if (token) {
    try {
      const response = await fetch(baseUrl, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        cache: cacheData
      });
      return await handleResponse(response);
    } catch (error: any) {
      console.error('Error in simpleGETrequest:', error);
      throw new ClientError(error.message || "Server connection failed");
    }
  } else {
    throw new ClientError('Token not found');
  }
}

export async function simplePOSTrequest(baseUrl: string, data: object) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || null;
  if (token) {
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await handleResponse(response);
    } catch (error: any) {
      console.error('Error in simplePOSTrequest:', error);
      throw new ClientError(error.message || "Server connection failed");
    }
  } else {
    throw new ClientError('Token not found');
  }
}

export async function publicFormDataSubmit(baseUrl: string, formData: FormData, requestType: 'POST' | 'PATCH' | 'PUT') {
  try {
    const response = await fetch(baseUrl, {
      method: requestType,
      body: formData
    });
    return await handleResponse(response);
  } catch (error: any) {
    console.error('Error in publicFormDataSubmit:', error);
    throw new ClientError(error.message || 'An error occurred');
  }
}

export async function formDataSubmit(baseUrl: string, formData: FormData, requestType: 'POST' | 'PATCH' | 'PUT') {
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
      return await handleResponse(response);
    } catch (error: any) {
      console.error('Error in formDataSubmit:', error);
      throw new ClientError(error.message || 'An error occurred');
    }
  } else {
    throw new ClientError('Token not found');
  }
}

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
      throw new ClientError(error.detail);
    }

    const data = await response.json();
    return data.image_url;

  } catch (error: any) {
    console.error('Error in getProtectedImage:', error);
    throw new ClientError(error.message || 'An error occurred');
  }
}