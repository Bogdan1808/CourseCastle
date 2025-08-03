'use client'

import React, { useRef, useState, useEffect } from "react";
import { Maximize2, Volume2, VolumeX, Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import { startCourse, finishCourse } from "@/app/actions/courseActions";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  courseId: string;
  status: string;
  onStatusChange?: (newStatus: string) => void;
}

export default function VideoPlayer({ src, poster, courseId, status, onStatusChange }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasStarted, setHasStarted] = useState(status === "Started" || status === "Finished");
  const [hasFinished, setHasFinished] = useState(status === "Finished");

  useEffect(() => {
    setHasStarted(status === "Started" || status === "Finished");
    setHasFinished(status === "Finished");
  }, [status]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = async () => {
      setCurrentTime(video.currentTime);

      if (
        !hasFinished &&
        video.duration > 0 &&
        video.currentTime / video.duration >= 0.9
      ) {
        const res = await finishCourse(courseId);
        if (res.success) {
          setHasFinished(true);
          onStatusChange?.("Finished");
        }
      }
    };

    const handleLoadedMetadata = () => setDuration(video.duration);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    if (video.readyState >= 1 && Number.isFinite(video.duration)) {
      setDuration(video.duration);
    }

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [hasFinished, courseId, onStatusChange]);

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {});

    if (!hasStarted && !hasFinished) {
      const res = await startCourse(courseId);
      if (res.success) {
        setHasStarted(true);
        onStatusChange?.("Started");
      }
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      handlePlay();
    } else {
      video.pause();
    }
  };  

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const time = Number(e.target.value);
    video.currentTime = time;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const vol = Number(e.target.value);
    video.volume = vol;
    setVolume(vol);
    setMuted(vol === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !muted;
    setMuted(!muted);
    if (!muted && volume === 0) {
      setVolume(0.5);
      video.volume = 0.5;
    }
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    let newTime = video.currentTime + seconds;
    newTime = Math.max(0, Math.min(newTime, video.duration || 0));
    video.currentTime = newTime;
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if ((video as any).webkitRequestFullscreen) {
        (video as any).webkitRequestFullscreen();
      } else if ((video as any).msRequestFullscreen) {
        (video as any).msRequestFullscreen();
      }
    }
  };

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex justify-center items-center w-full py-6">
      <div className="w-full max-w-3xl bg-black rounded-xl overflow-hidden shadow-2xl border border-stone-800">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full bg-black"
          onClick={togglePlay}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          tabIndex={0}
        />
        <div className="flex flex-col gap-2 bg-stone-950/95 px-4 py-3 rounded-b-xl">
          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-300 font-mono w-10 text-right">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration > 0 ? duration : 0}
              step={0.01}
              value={currentTime}
              onChange={handleProgressChange}
              className="flex-1 accent-amber-400 h-1"
              disabled={duration === 0}
            />
            <span className="text-xs text-stone-300 font-mono w-10">{formatTime(duration)}</span>
          </div>
          {/* Controls */}
          <div className="flex items-center gap-4 justify-between mt-1">
            <div className="flex items-center gap-2">
              <button onClick={() => skip(-5)} title="Back 5 seconds" className="p-2 rounded hover:bg-stone-800 focus:bg-stone-800 text-amber-300 hover:text-amber-400 focus:text-amber-400 transition">
                <RotateCcw size={22} />
              </button>
              <button onClick={togglePlay} title={playing ? "Pause" : "Play"} className="p-2 rounded hover:bg-stone-800 focus:bg-stone-800 text-amber-300 hover:text-amber-400 focus:text-amber-400 transition">
                {playing ? <Pause size={22} /> : <Play size={22} />}
              </button>
              <button onClick={() => skip(5)} title="Forward 5 seconds" className="p-2 rounded hover:bg-stone-800 focus:bg-stone-800 text-amber-300 hover:text-amber-400 focus:text-amber-400 transition">
                <RotateCw size={22} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} title={muted ? "Unmute" : "Mute"} className="p-2 rounded hover:bg-stone-800 focus:bg-stone-800 text-amber-300 hover:text-amber-400 focus:text-amber-400 transition">
                {muted || volume === 0 ? <VolumeX size={22} /> : <Volume2 size={22} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className="accent-amber-400"
                style={{ width: 80 }}
              />
            </div>
            <button onClick={toggleFullscreen} title="Fullscreen" className="p-2 rounded hover:bg-stone-800 focus:bg-stone-800 text-amber-300 hover:text-amber-400 focus:text-amber-400 transition">
              <Maximize2 size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}