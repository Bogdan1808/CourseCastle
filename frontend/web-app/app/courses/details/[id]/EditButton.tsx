import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

type Props = {
    id: string;
}

export default function EditButton({ id }: Props) {
  return (
    <Link href={`/courses/update/${id}`} className="w-full">
      <Button className="w-full btn-medieval py-6 text-lg">
        Update Course
      </Button>
    </Link>
  );
}