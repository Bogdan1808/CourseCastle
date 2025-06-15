'use client'

import Input from '@/components/Input';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { publishCourse, updateCourse } from '../actions/courseActions';
import toast from 'react-hot-toast';
import { Course } from '@/types';
import CategoryFormSelector from './CategoryFormSelector';
import LevelFormSelector from './LevelFormSelector';

type Props = {
    course?: Course;
}

interface CourseFormFields {
    courseTitle: string;
    description: string;
    instructor: string;
    category: string;
    level: string;
    duration: string;
    coursePrice: string;
    imageUrl: string;
    dateCreated: string;
}

export default function CourseForm({course}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const { control, handleSubmit, reset, formState: { isSubmitting, isValid, isDirty } } = useForm<CourseFormFields>({
        mode: 'onTouched',
        defaultValues: {
            courseTitle: '',
            description: '',
            instructor: '',
            category: '',
            level: '',
            duration: '',
            coursePrice: '',
            imageUrl: '',
            dateCreated: ''
        }
    });

    useEffect(() => {
        if (course) {
            const { courseTitle, description, instructor, coursePrice, imageUrl } = course;
            reset({
                courseTitle,
                description,
                instructor,
                coursePrice: coursePrice?.toString() || '',
                imageUrl
            });
        }
    }, [course, reset]);

    const inputStyle =
        "bg-stone-900 border border-stone-700 text-white placeholder-stone-400 rounded-lg focus:ring-amber-400 focus:border-amber-400 transition text-base px-4 py-3 shadow";

    async function onSubmit(data: CourseFormFields) {
        try {
            let id = '';
            let res;
            if(pathname === '/courses/publish') {
                console.log("Submitting data:", data);
                res = await publishCourse(data);
                id = res.id;
            } else {
                if (course) {
                    res = await updateCourse(data, course.id);
                    id = course.id;
                }
            }
            if (res.error) {
                throw new Error(res.error.message || "Unknown error");
            }
            router.push(`/courses/details/${id}`);
        } catch (error: any) {
            toast.error(error.status + ' ' + error.message)
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto mt-10">
            {pathname === '/courses/publish' && (
                <>
                    <h2 className="text-3xl font-bold text-amber-400 mb-4 text-center">Publish your course</h2>
                    <h3 className="text-xl font-bold text-stone-400 mb-8 text-center">Create your own kingdom</h3>
                </>
            )}
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 gap-6">
                    <Input name="courseTitle" label="Course Title" control={control} rules={{ required: "Title is required" }} showLabel inputClassName={inputStyle} />
                    <Input name="instructor" label="Instructor" control={control} rules={{ required: "Instructor is required" }} showLabel inputClassName={inputStyle} />

                    {pathname === '/courses/publish' &&
                    <>
                        <CategoryFormSelector 
                            name="category" 
                            label="Category" 
                            control={control} 
                            rules={{ required: "Category is required" }} 
                            showLabel 
                        />
                        <LevelFormSelector 
                            name="level" 
                            label="Level" 
                            control={control} 
                            rules={{ required: "Level is required" }} 
                            showLabel 
                        />
                        <Input name="duration" label="Duration" control={control} rules={{ required: "Duration is required" }} showLabel inputClassName={inputStyle}/>
                        <Input name="dateCreated" label="Date created" type="date" control={control} rules={{ required: "Creation date is required" }} showLabel inputClassName={inputStyle} />
                    </>}  

                    <Input name="coursePrice" label="Price" type="number" control={control} rules={{ required: "Price is required" }} showLabel inputClassName={inputStyle} />
                    <Input name="imageUrl" label="Thumbnail Image URL" control={control} rules={{ required: "Image URL is required" }} showLabel inputClassName={inputStyle} />
                </div>
                <Input name="description" label="Course Description" control={control} rules={{ required: "Description is required" }} showLabel inputClassName={inputStyle} />


                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        onClick={() => router.push('/')}
                        className="bg-stone-800 border border-stone-700 text-white rounded-lg px-6 py-2 font-medium hover:bg-stone-700 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!isValid || !isDirty || isSubmitting}
                        className="bg-gradient-to-r from-amber-400 to-amber-600 text-stone-900 font-bold rounded-lg px-8 py-2 shadow hover:from-amber-500 hover:to-amber-700 transition disabled:opacity-60"
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    )
}