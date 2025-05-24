"use client";

import React from 'react'

import Image from 'next/image';
import { useState } from 'react';

type CourseCardProps = {
    imageUrl: string;
}

export default function CourseThumbnail({ imageUrl }: CourseCardProps) {
    const [loading, setLoading] = useState(true);

  return (
    <Image
     src={"/images/CCplaceholder.png"}
     alt='Course Thumbnail'
     fill
     className={
        `object-cover duration-700 ease-in-out
        ${loading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`
     }
     priority
     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
     onLoad={() => setLoading(false)}
    />
  )
}
