'use server'

import { auth } from '@/auth';
import { PagedResult, Course } from '@/types';

export async function getData(query: string): Promise<PagedResult<Course>> {
  const res = await fetch(`http://localhost:6001/search${query}`);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

export async function updateCourseTest(): Promise<{status: number, message: string}> {
  const data = {
    coursePrice: Math.floor(Math.random() * 1000) + 1
  }

  const session = await auth();

  const res = await fetch(`http://localhost:6001/courses/70d0db11-e855-4dff-bdc4-dad63bf9fcba`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.accessToken}`
    },
    body: JSON.stringify(data)
  });

  if(!res.ok) return { status: res.status, message: res.statusText };

  return {
    status: res.status,
    message: res.statusText
  }
}