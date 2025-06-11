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

async function handleResponse(response: Response) {
    const text = await response.text();
    let data;
    
    try {
        data = text && JSON.parse(text);
    } catch {
        data = text; // If it's not JSON, use the text directly
    }
    
    if (response.ok) {
        return data || response.statusText;
    } else {
        console.log('=== API Error Response ===');
        console.log('Status:', response.status);
        console.log('Status Text:', response.statusText);
        console.log('Response Data:', data);
        console.log('========================');
        
        const error = { 
            status: response.status,
            message: data || response.statusText,
            statusText: response.statusText
        }
        
        throw {error}; // Throw the error so it can be caught in the action
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

export const fetchWrapper = {
    get,
    put,
    del,
    post
}