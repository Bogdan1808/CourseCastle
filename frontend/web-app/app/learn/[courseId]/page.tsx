"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize,
  Clock,
  CheckSquare,
  Square,
  Star,
  Users,
  Calendar,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PlayerNavbar } from "@/components/player-navbar"

export default function CoursePlayerPage({ params }: { params: { courseId: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(100)
  const [activeChapter, setActiveChapter] = useState("chapter-1")
  const [activeLecture, setActiveLecture] = useState("lecture-1")
  const videoRef = useRef<HTMLVideoElement>(null)

  // Mock course data based on course ID
  const courseData = {
    "1": {
      id: "1",
      title: "The Art of Medieval Coding",
      instructor: "Sir CodeALot",
      rating: 4.8,
      numRatings: 1243,
      students: 8506,
      totalHours: 24,
      lastUpdated: "May 2024",
      videoUrl: "/videos/course-video.mp4",
      chapters: [
        {
          id: "chapter-1",
          title: "Introduction to Medieval Coding",
          lectures: [
            { id: "lecture-1", title: "Welcome to the Course", duration: "5min", completed: true },
            { id: "lecture-2", title: "The History of Medieval Programming", duration: "12min", completed: false },
            {
              id: "lecture-3",
              title: "Setting Up Your Castle Development Environment",
              duration: "15min",
              completed: false,
            },
          ],
        },
        {
          id: "chapter-2",
          title: "The Fundamentals of Castle Building",
          lectures: [
            { id: "lecture-4", title: "HTML: The Foundation Stones", duration: "18min", completed: false },
            { id: "lecture-5", title: "CSS: The Castle Decorations", duration: "22min", completed: false },
            { id: "lecture-6", title: "JavaScript: The Castle Mechanics", duration: "25min", completed: false },
          ],
        },
        {
          id: "chapter-3",
          title: "Advanced Medieval Techniques",
          lectures: [
            { id: "lecture-7", title: "React: The Royal Framework", duration: "30min", completed: false },
            { id: "lecture-8", title: "State Management: The Castle Treasury", duration: "28min", completed: false },
            {
              id: "lecture-9",
              title: "API Integration: Communicating with Other Kingdoms",
              duration: "24min",
              completed: false,
            },
          ],
        },
        {
          id: "chapter-4",
          title: "Building Your First Medieval Application",
          lectures: [
            { id: "lecture-10", title: "Project Setup and Planning", duration: "15min", completed: false },
            { id: "lecture-11", title: "Creating the User Interface", duration: "32min", completed: false },
            { id: "lecture-12", title: "Adding Interactivity", duration: "27min", completed: false },
            { id: "lecture-13", title: "Deploying Your Castle to the World", duration: "20min", completed: false },
          ],
        },
        {
          id: "chapter-5",
          title: "Course Conclusion",
          lectures: [
            { id: "lecture-14", title: "Project Review and Best Practices", duration: "18min", completed: false },
            {
              id: "lecture-15",
              title: "Next Steps in Your Medieval Coding Journey",
              duration: "10min",
              completed: false,
            },
          ],
        },
      ],
    },
    // Default course data for other IDs
    default: {
      id: params.courseId,
      title:
        "How to build a microservices based app using .Net, NextJS, IdentityServer, RabbitMQ running on Docker and Kubernetes",
      instructor: "Sir CodeALot",
      rating: 4.8,
      numRatings: 1110,
      students: 8506,
      totalHours: 38,
      lastUpdated: "August 2024",
      videoUrl: "",
      chapters: [
        {
          id: "chapter-1",
          title: "Introduction to Microservices",
          lectures: [
            { id: "lecture-1", title: "Course Overview", duration: "10min", completed: true },
            { id: "lecture-2", title: "Microservices Architecture Basics", duration: "15min", completed: true },
            { id: "lecture-3", title: "Setting Up Development Environment", duration: "12min", completed: false },
          ],
        },
        {
          id: "chapter-2",
          title: "Building with .NET and NextJS",
          lectures: [
            { id: "lecture-4", title: "Creating the .NET API Project", duration: "18min", completed: false },
            { id: "lecture-5", title: "Setting Up NextJS Frontend", duration: "14min", completed: false },
            { id: "lecture-6", title: "Connecting Frontend to Backend", duration: "16min", completed: false },
          ],
        },
        // Additional chapters...
      ],
    },
  }

  // Get the course data based on the ID, fallback to default if not found
  const course = courseData[params.courseId as keyof typeof courseData] || courseData.default

  // Find the current lecture
  const currentChapter = course.chapters.find((chapter) => chapter.id === activeChapter)
  const currentLecture = currentChapter?.lectures.find((lecture) => lecture.id === activeLecture)

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  // Handle video loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  // Format time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Handle seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100
    }
  }

  // Handle video ended
  const handleVideoEnded = () => {
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }

  // Calculate progress
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  // Calculate course progress
  const totalLectures = course.chapters.reduce((acc, chapter) => acc + chapter.lectures.length, 0)
  const completedLectures = course.chapters.reduce(
    (acc, chapter) => acc + chapter.lectures.filter((lecture) => lecture.completed).length,
    0,
  )
  const courseProgress = totalLectures > 0 ? (completedLectures / totalLectures) * 100 : 0

  // Effect to handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space bar to play/pause
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault()
        togglePlay()
      }
      // Left arrow to rewind 5 seconds
      if (e.code === "ArrowLeft" && videoRef.current) {
        videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5)
      }
      // Right arrow to forward 5 seconds
      if (e.code === "ArrowRight" && videoRef.current) {
        videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 5)
      }
      // M key to mute/unmute
      if (e.code === "KeyM" && videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [duration])

  return (
    <div className="min-h-screen bg-stone-900 text-white flex flex-col">
      {/* Header */}
      <PlayerNavbar courseTitle={course.title} />

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Video Player */}
        <div className="md:w-3/4 flex flex-col">
          {/* Video Player */}
          <div className="relative bg-black aspect-video">
            <video
              ref={videoRef}
              className="w-full h-full"
              poster="/placeholder.svg?height=720&width=1280"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleVideoEnded}
              loop
            >
              <source src={course.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress Bar */}
              <div className="mb-2">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-stone-700 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #f59e0b ${progress}%, #44403c ${progress}%)`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={togglePlay} className="text-white hover:text-amber-400 transition-colors">
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </button>
                  <button className="text-white hover:text-amber-400 transition-colors">
                    <SkipBack className="h-5 w-5" />
                  </button>
                  <button className="text-white hover:text-amber-400 transition-colors">
                    <SkipForward className="h-5 w-5" />
                  </button>
                  <div className="text-sm text-stone-300">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-24">
                    <Volume2 className="h-5 w-5 text-white" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full h-1 bg-stone-700 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #f59e0b ${volume}%, #44403c ${volume}%)`,
                      }}
                    />
                  </div>
                  <button className="text-white hover:text-amber-400 transition-colors">
                    <Maximize className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Course Info Tabs */}
          <div className="bg-stone-800 border-b border-stone-700">
            <div className="container mx-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-transparent border-b border-stone-700 w-full justify-start h-auto p-0">
                  {["overview", "q&a", "notes", "announcements", "reviews", "learning tools"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:text-amber-400 capitalize"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="overview" className="p-6">
                  <h1 className="text-2xl font-bold text-amber-300 mb-4">{course.title}</h1>
                  <div className="flex flex-wrap gap-6 mb-6">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                      <span className="font-medium">{course.rating}</span>
                      <span className="text-stone-400">({course.numRatings} ratings)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-5 w-5 text-stone-400" />
                      <span className="text-stone-400">{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-5 w-5 text-stone-400" />
                      <span className="text-stone-400">{course.totalHours} hours total</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-5 w-5 text-stone-400" />
                      <span className="text-stone-400">Last updated {course.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-amber-200 mb-2">Course Progress</h2>
                    <div className="flex items-center gap-4">
                      <Progress
                        value={courseProgress}
                        className="h-2 w-full bg-stone-700"
                        indicatorClassName="bg-amber-500"
                      />
                      <span className="text-sm text-stone-300 whitespace-nowrap">
                        {completedLectures}/{totalLectures} lectures
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-amber-200 mb-2">About the Instructor</h2>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-amber-500">
                        <Image
                          src="/placeholder.svg?height=64&width=64"
                          alt={course.instructor}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-amber-300">{course.instructor}</h3>
                        <p className="text-stone-400 text-sm">Master Developer & Medieval Coding Expert</p>
                        <p className="text-stone-300 mt-2">
                          Experienced instructor with expertise in teaching the ancient arts of coding with modern
                          tools. Sir CodeALot has trained over 10,000 students in the ways of medieval programming
                          techniques.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-amber-200 mb-2">Course Description</h2>
                    <p className="text-stone-300">
                      Master the ancient arts of programming with modern tools. This comprehensive course will take you
                      from novice to knight in the realm of code.
                    </p>
                    <p className="text-stone-300 mt-4">
                      You'll learn how to build robust web applications using HTML, CSS, and JavaScript, with a focus on
                      React and modern frontend development. By the end of this course, you'll have the skills to create
                      your own digital castles on the web.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="q&a" className="p-6">
                  <h2 className="text-xl font-bold text-amber-300 mb-4">Questions & Answers</h2>
                  <p className="text-stone-400">
                    Ask questions and get answers from the instructor and other students.
                  </p>
                </TabsContent>

                <TabsContent value="notes" className="p-6">
                  <h2 className="text-xl font-bold text-amber-300 mb-4">Your Notes</h2>
                  <p className="text-stone-400">
                    Take notes while watching the lectures to help you remember key concepts.
                  </p>
                </TabsContent>

                <TabsContent value="announcements" className="p-6">
                  <h2 className="text-xl font-bold text-amber-300 mb-4">Announcements</h2>
                  <p className="text-stone-400">
                    Stay updated with the latest course announcements from the instructor.
                  </p>
                </TabsContent>

                <TabsContent value="reviews" className="p-6">
                  <h2 className="text-xl font-bold text-amber-300 mb-4">Student Reviews</h2>
                  <p className="text-stone-400">See what other students are saying about this course.</p>
                </TabsContent>

                <TabsContent value="learning tools" className="p-6">
                  <h2 className="text-xl font-bold text-amber-300 mb-4">Learning Tools</h2>
                  <p className="text-stone-400">Access additional resources to enhance your learning experience.</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Course Content Sidebar */}
        <div className="md:w-1/4 bg-stone-800 border-l border-stone-700 overflow-y-auto max-h-[calc(100vh-56px)] sticky top-14">
          <div className="p-4 border-b border-stone-700">
            <h2 className="text-lg font-bold text-amber-300">Course content</h2>
            <div className="flex items-center justify-between text-sm text-stone-400 mt-2">
              <span>
                {course.chapters.length} sections • {totalLectures} lectures • {course.totalHours} hours total
              </span>
            </div>
          </div>

          <div className="divide-y divide-stone-700">
            <Accordion type="multiple" defaultValue={[activeChapter]} className="w-full">
              {course.chapters.map((chapter) => (
                <AccordionItem key={chapter.id} value={chapter.id} className="border-b border-stone-700 px-0">
                  <AccordionTrigger
                    onClick={() => setActiveChapter(chapter.id)}
                    className={`px-4 py-3 hover:bg-stone-700/50 ${
                      activeChapter === chapter.id ? "bg-stone-700/30" : ""
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-medium text-amber-200">{chapter.title}</div>
                      <div className="text-xs text-stone-400 mt-1">
                        {chapter.lectures.length} lectures •{" "}
                        {chapter.lectures.reduce((acc, lecture) => {
                          const minutes = Number.parseInt(lecture.duration.replace("min", ""))
                          return acc + minutes
                        }, 0)}{" "}
                        min
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-0 pb-0">
                    <div className="divide-y divide-stone-700/50">
                      {chapter.lectures.map((lecture) => (
                        <div
                          key={lecture.id}
                          className={`flex items-start gap-3 p-4 hover:bg-stone-700/30 cursor-pointer ${
                            activeLecture === lecture.id ? "bg-stone-700/50" : ""
                          }`}
                          onClick={() => setActiveLecture(lecture.id)}
                        >
                          <div className="pt-0.5">
                            {lecture.completed ? (
                              <CheckSquare className="h-4 w-4 text-amber-400" />
                            ) : (
                              <Square className="h-4 w-4 text-stone-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-stone-200">{lecture.title}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Play className="h-3 w-3 text-stone-400" />
                              <span className="text-xs text-stone-400">{lecture.duration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
