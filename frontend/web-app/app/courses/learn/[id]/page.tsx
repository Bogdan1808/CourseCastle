import { getDetailedViewData } from "@/app/actions/courseActions";
import { getCurrentUser } from "@/app/actions/authActions";
import VideoPlayer from "@/components/VideoPlayer";
import CourseProgress from "@/components/CourseProgress";
import {
  Clock,
  Calendar,
  BarChart3,
  Users,
  Star,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";

type Props = {
  params: { id: string };
};

export default async function LearnPage({ params }: Props) {
  const course = await getDetailedViewData(params.id);
  const user = await getCurrentUser();

  if (!course) {
    return notFound();
  }

  // if (!user || (course.ownership !== "Owned" && course.status === "NotStarted")) {
  //     redirect(`/courses/details/${params.id}`);
  // }

  return (
    <div className="min-h-screen bg-castle-wall relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      <div className="relative z-10">
        <Navbar />
        
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Header with smaller text */}
          <div className="mb-6">
            <Link
              href={`/courses/details/${params.id}`}
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors mb-4 text-base font-medium group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Course Details
            </Link>
            
            <div className="bg-stone-900/95 backdrop-blur-sm rounded-xl p-5 border border-stone-700 shadow-2xl">
              <h1 className="text-3xl font-bold text-white mb-2 leading-tight pixel-text">
                {course.courseTitle}
              </h1>
              <p className="text-stone-300 text-lg">
                by <span className="text-amber-400 font-semibold">{course.instructor}</span>
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Video Section */}
            <div className="lg:col-span-2 space-y-5">
              {/* Video Player */}
              <div className="bg-stone-900/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-stone-700">
                {course.videoUrl ? (
                  <VideoPlayer videoUrl={course.videoUrl} />
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="bg-stone-700/50 rounded-full p-5 mb-4 inline-block">
                        <BookOpen className="w-16 h-16 text-stone-400" />
                      </div>
                      <p className="text-stone-300 text-lg font-medium mb-1">
                        No video available for this course
                      </p>
                      <p className="text-stone-500 text-sm">
                        Check back later for video content
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Course Progress - Enhanced visibility */}
              <div className="bg-stone-900/95 backdrop-blur-sm rounded-xl p-4 border border-stone-700 shadow-xl">
                <CourseProgress
                  courseId={params.id}
                  status={course.status}
                />
              </div>

              {/* Course Description */}
              <div className="bg-stone-900/95 backdrop-blur-sm rounded-xl p-6 border border-stone-700 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 pixel-text">
                  <div className="w-1 h-6 bg-amber-400 rounded-full"></div>
                  About This Course
                </h2>
                <p className="text-stone-200 leading-relaxed text-base">
                  {course.description}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-5">
              {/* Course Image */}
              {course.imageUrl && (
                <div className="bg-stone-900/95 backdrop-blur-sm rounded-xl p-3 border border-stone-700 shadow-xl">
                  <img
                    src={course.imageUrl}
                    alt={course.courseTitle}
                    className="w-full rounded-lg shadow-lg border border-stone-600/30"
                  />
                </div>
              )}

              {/* Course Stats */}
              <div className="bg-stone-900/95 backdrop-blur-sm rounded-xl p-5 border border-stone-700 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 pixel-text">
                  <div className="w-1 h-5 bg-amber-400 rounded-full"></div>
                  Course Details
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2.5 bg-stone-800/60 rounded-lg border border-stone-700/40">
                    <div className="p-2 bg-amber-400/20 rounded-lg border border-amber-400/30">
                      <BarChart3 className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-stone-400 text-xs font-medium">Level</p>
                      <p className="text-white font-semibold text-sm">{course.level}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 bg-stone-800/60 rounded-lg border border-stone-700/40">
                    <div className="p-2 bg-blue-400/20 rounded-lg border border-blue-400/30">
                      <Clock className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-stone-400 text-xs font-medium">Duration</p>
                      <p className="text-white font-semibold text-sm">{course.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 bg-stone-800/60 rounded-lg border border-stone-700/40">
                    <div className="p-2 bg-green-400/20 rounded-lg border border-green-400/30">
                      <Calendar className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-stone-400 text-xs font-medium">Created</p>
                      <p className="text-white font-semibold text-sm">
                        {new Date(course.dateCreated).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 bg-stone-800/60 rounded-lg border border-stone-700/40">
                    <div className="p-2 bg-purple-400/20 rounded-lg border border-purple-400/30">
                      <Users className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-stone-400 text-xs font-medium">Students</p>
                      <p className="text-white font-semibold text-sm">
                        {course.students?.toLocaleString() || 0}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 bg-stone-800/60 rounded-lg border border-stone-700/40">
                    <div className="p-2 bg-amber-400/20 rounded-lg border border-amber-400/30">
                      <Star className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-stone-400 text-xs font-medium">Rating</p>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-semibold text-sm">{course.rating}</p>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(course.rating)
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-stone-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 bg-stone-800/60 rounded-lg border border-stone-700/40">
                    <div className="p-2 bg-emerald-400/20 rounded-lg border border-emerald-400/30">
                      <span className="text-emerald-400 font-bold text-lg">$</span>
                    </div>
                    <div>
                      <p className="text-stone-400 text-xs font-medium">Price</p>
                      <p className="text-white font-semibold text-sm">
                        ${course.coursePrice?.toLocaleString() || "0"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="bg-stone-900/95 backdrop-blur-sm rounded-xl p-5 border border-stone-700 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2 pixel-text">
                  <div className="w-1 h-5 bg-amber-400 rounded-full"></div>
                  Category
                </h3>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-400/20 to-amber-500/20 border border-amber-400/40 rounded-xl shadow-lg">
                  <span className="text-amber-300 font-semibold text-sm">
                    {course.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}