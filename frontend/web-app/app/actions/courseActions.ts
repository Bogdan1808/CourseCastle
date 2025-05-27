'use server'

import { PagedResult, Course } from '@/types';

export async function getData(query: string): Promise<PagedResult<Course>> {
  const res = await fetch(`http://localhost:6001/search${query}`);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}
