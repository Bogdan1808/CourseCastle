'use client'

import { CheckCircle, Clock, Play } from 'lucide-react';

type Props = {
    courseId: string;
    status: string;
    className?: string;
}

export default function CourseProgress({ courseId, status, className = '' }: Props) {
    const getStatusInfo = () => {
        switch (status) {
            case 'Completed':
                return {
                    icon: <CheckCircle className="w-5 h-5 text-green-400" />,
                    text: 'Course Completed',
                    bgColor: 'bg-green-400/10 border-green-400/20',
                    textColor: 'text-green-400'
                };
            case 'InProgress':
                return {
                    icon: <Play className="w-5 h-5 text-amber-400" />,
                    text: 'In Progress',
                    bgColor: 'bg-amber-400/10 border-amber-400/20',
                    textColor: 'text-amber-400'
                };
            default:
                return {
                    icon: <Clock className="w-5 h-5 text-blue-400" />,
                    text: 'Not Started',
                    bgColor: 'bg-blue-400/10 border-blue-400/20',
                    textColor: 'text-blue-400'
                };
        }
    };

    const statusInfo = getStatusInfo();

    return (
        <div className={`${statusInfo.bgColor} border rounded-xl p-4 ${className}`}>
            <div className="flex items-center gap-3">
                {statusInfo.icon}
                <span className={`font-medium ${statusInfo.textColor}`}>
                    {statusInfo.text}
                </span>
            </div>
        </div>
    );
}