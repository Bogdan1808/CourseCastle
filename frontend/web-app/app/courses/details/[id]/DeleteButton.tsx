'use client'

import { deleteCourse } from '@/app/actions/courseActions';
import { Button, Spinner } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

type Props = {
    id: string;
}

export default function DeleteButton({ id }: Props) {
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();

    function handleDeleteClick() {
        setShowConfirm(true);
    }

    function handleConfirmDelete() {
        setLoading(true);
        setShowConfirm(false);
        deleteCourse(id)
            .then((res) => {
               if(res.error) throw res.error;
               router.push('/'); 
            })
            .catch(error => {
                toast.error(error.status + ' ' + error.message);
            })
            .finally(() => setLoading(false));
    }

    function handleCancelDelete() {
        setShowConfirm(false);
    }

    if (showConfirm) {
        return (
            <div className="space-y-3">
                <div className="bg-red-950/80 border border-red-700 rounded-lg p-4 text-center">
                    <p className="text-red-200 font-medium mb-4">
                        Are you sure you want to delete this course?
                    </p>
                    <div className="flex gap-3">
                        <Button 
                            onClick={handleConfirmDelete}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 text-sm font-medium rounded-lg transition-colors"
                            disabled={loading}
                        >
                            {loading && <Spinner size="sm" className="mr-2"/>}
                            Yes, Delete
                        </Button>
                        <Button 
                            onClick={handleCancelDelete}
                            className="flex-1 bg-stone-600 hover:bg-stone-700 text-white py-2 text-sm font-medium rounded-lg transition-colors"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Button 
            outline 
            color='red' 
            onClick={handleDeleteClick} 
            className="w-full btn-medieval-red py-6 text-lg"
        >
            Delete Course
        </Button>
    )
}