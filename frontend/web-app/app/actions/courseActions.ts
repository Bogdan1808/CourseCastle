'use server'

import { fetchWrapper } from '@/lib/fetchWrapper';
import { PagedResult, Course } from '@/types';
import { FieldValues } from 'react-hook-form';

export async function getData(query: string): Promise<PagedResult<Course>> {
  return fetchWrapper.get(`search${query}`);
}

export async function updateCourseTest(): Promise<{status: number, message: string}> {
  const data = {
    coursePrice: Math.floor(Math.random() * 10000) + 1
  }

  return fetchWrapper.put('courses/c45e54db-5587-4acd-8b30-11745cc8d903', data);
}

export async function publishCourse(formData: FormData){
  return fetchWrapper.postFormData('courses', formData);
}

export async function getDetailedViewData(id: string): Promise<Course & { ownership: string; status: string }> {
  const course = await fetchWrapper.get(`courses/${id}`);

  try {
    const userCourseStatus = await fetchWrapper.get(`courses/usercoursestatus/${id}`);
    
    return {
      ...course,
      ownership: userCourseStatus.ownership,
      status: userCourseStatus.status
    };
  } catch (error) {
    return {
      ...course,
      ownership: "NotOwned",
      status: "NotStarted"
    };
  }
}

export async function getWishlistCourses(): Promise<Course[]> {
  try {
    return await fetchWrapper.get('courses/wishlist');
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return [];
  }
}

export async function addToWishlist(courseId: string): Promise<{success: boolean, message: string}> {
  try {
    console.log('=== Adding to wishlist, courseId:', courseId);
    console.log('=== API URL will be:', `courses/wishlist/${courseId}`);
    
    const result = await fetchWrapper.post(`courses/wishlist/${courseId}`, {});
    console.log('=== Add to wishlist result:', result);
    
    return { success: true, message: 'Course added to wishlist' };
  } catch (error: any) {
    console.log('=== Error in addToWishlist:', error);
    
    let errorMessage = 'Failed to add to wishlist';
    
    if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    return { success: false, message: errorMessage };
  }
}

export async function removeFromWishlist(courseId: string): Promise<{success: boolean, message: string}> {
  try {
    console.log('=== Removing from wishlist, courseId:', courseId);
    console.log('=== API URL will be:', `courses/wishlist/${courseId}`);
    
    const result = await fetchWrapper.del(`courses/wishlist/${courseId}`);
    console.log('=== Remove from wishlist result:', result);
    
    return { success: true, message: 'Course removed from wishlist' };
  } catch (error: any) {
    console.log('=== Error in removeFromWishlist:', error);
    
    let errorMessage = 'Failed to remove from wishlist';
    
    if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    return { success: false, message: errorMessage };
  }
}

export async function updateCourse(formData: FormData, id: string) {
  return fetchWrapper.putFormData(`courses/${id}`, formData);
}

export async function deleteCourse(id: string) {
  return fetchWrapper.del(`courses/${id}`);
}