import { auth } from "@/auth";

const baseUrl = 'http://localhost:6001/';

async function get(url: string){
    const requestOptions = {
        method: 'GET',
        headers: await getHeaders()
    };
    const response = await fetch(baseUrl + url, requestOptions);
    return handleResponse(response);
}

async function put(url: string, body: unknown){
    const requestOptions = {
        method: 'PUT',
        headers: await getHeaders(),
        body: JSON.stringify(body)
    };
    const response = await fetch(baseUrl + url, requestOptions);
    return handleResponse(response);
}

async function del(url: string){
    const requestOptions = {
        method: 'DELETE',
        headers: await getHeaders()
    };
    const response = await fetch(baseUrl + url, requestOptions);
    return handleResponse(response);
}

async function post(url: string, body: unknown){
    const requestOptions = {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(body)
    };
    const response = await fetch(baseUrl + url, requestOptions);
    return handleResponse(response);
}

async function postFormData(url: string, formData: FormData){
    const requestOptions = {
        method: 'POST',
        headers: await getFormDataHeaders(),
        body: formData
    };
    const response = await fetch(baseUrl + url, requestOptions);
    return handleResponse(response);
}

async function putFormData(url: string, formData: FormData){
    const requestOptions = {
        method: 'PUT',
        headers: await getFormDataHeaders(),
        body: formData
    };
    const response = await fetch(baseUrl + url, requestOptions);
    return handleResponse(response);
}

async function handleResponse(response: Response) {
    const text = await response.text();
    let data;
    try {
        data = text && JSON.parse(text);
    } catch (parseError) {
        if (text && typeof text === "string") {
            console.log("Non-JSON response:", text);
        }
        data = text;
    }
    return data;
}

export async function postClient(url: string, body: any, token?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const response = await fetch(baseUrl + url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  return response.json();
}

async function getHeaders(): Promise<Headers> {
    const session = await auth();
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    if(session){
        headers.set('Authorization', `Bearer ${session.accessToken}`);
    }
    return headers;
}

async function getFormDataHeaders(): Promise<Headers> {
    const session = await auth();
    const headers = new Headers();
    if(session){
        headers.set('Authorization', `Bearer ${session.accessToken}`);
    }
    return headers;
}

export const fetchWrapper = {
    get,
    put,
    del,
    post,
    postFormData,
    putFormData,
    postClient
}