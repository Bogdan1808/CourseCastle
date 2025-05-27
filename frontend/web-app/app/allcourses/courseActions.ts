'use server'

import { PagedResult, Course } from '@/types';

export async function getData(page: number, pageSize: number): Promise<PagedResult<Course>> {
  const res = await fetch(`http://localhost:6001/search?PageSize=${pageSize}&PageNumber=${page}`);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}
