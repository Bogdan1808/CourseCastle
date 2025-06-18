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
    console.log("=== Response Debug ===");
    console.log("Status:", response.status);
    console.log("Status Text:", response.statusText);
    console.log("Headers:", Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log("Raw response text:", text);
    
    let data;
    try {
        data = text && JSON.parse(text);
        console.log("Parsed JSON:", data);
    } catch (parseError) {
        console.log("JSON parse error:", parseError);
        data = text;
    }
    
    if (response.ok) {
        return data || response.statusText;
    } else {
        console.log("=== Error Response ===");
        const error = { 
            status: response.status,
            message: data || response.statusText,
            statusText: response.statusText
        }
        console.log("Error object:", error);
        throw {error};
    }
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
    putFormData
}