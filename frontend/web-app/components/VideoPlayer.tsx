'use client'

import { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

type Props = {
    videoUrl: string;
}

export default function VideoPlayer({ videoUrl }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(progress);
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (videoRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const newTime = (clickX / width) * videoRef.current.duration;
            videoRef.current.currentTime = newTime;
        }
    };

    return (
        <div className="relative group">
            <video
                ref={videoRef}
                className="w-full aspect-video"
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Controls Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                    onClick={togglePlay}
                    className="p-4 bg-white/20 rounded-full hover:bg-white/30 transition"
                >
                    {isPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                    ) : (
                        <Play className="w-8 h-8 text-white" />
                    )}
                </button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Progress Bar */}
                <div 
                    className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-3"
                    onClick={handleProgressClick}
                >
                    <div 
                        className="h-full bg-amber-400 rounded-full transition-all duration-150"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded">
                            {isPlaying ? (
                                <Pause className="w-4 h-4 text-white" />
                            ) : (
                                <Play className="w-4 h-4 text-white" />
                            )}
                        </button>
                        
                        <button onClick={toggleMute} className="p-2 hover:bg-white/20 rounded">
                            {isMuted ? (
                                <VolumeX className="w-4 h-4 text-white" />
                            ) : (
                                <Volume2 className="w-4 h-4 text-white" />
                            )}
                        </button>
                    </div>

                    <button className="p-2 hover:bg-white/20 rounded">
                        <Maximize className="w-4 h-4 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}