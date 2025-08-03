"use client";
import { useState, useEffect } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import CourseProgress from "@/components/CourseProgress";
import CourseReviews from "@/components/CourseReviews";
import {
  Clock,
  Calendar,
  BarChart3,
  Users,
  Star,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { getCurrentUser } from "@/app/actions/authActions";

interface User {
  id: string;
  username: string;
}

export default function LearnClient({ course, params }: { course: any, params: { id: string } }) {
  const [courseStatus, setCourseStatus] = useState(course.status);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser as User | null);
    }
    fetchUser();
  }, []);

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-5">
        <div className="bg-stone-800/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-stone-700">
          {course.videoUrl ? (
            <VideoPlayer
              src={course.videoUrl}
              poster={course.imageUrl}
              courseId={course.id}
              status={courseStatus}
              onStatusChange={setCourseStatus}
            />
          ) : (
            <div className="aspect-video bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="bg-stone-700/50 rounded-full p-5 mb-4 inline-block">
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
        <div className="bg-stone-800/90 backdrop-blur-sm rounded-xl p-4 border border-stone-700 shadow-xl">
          <CourseProgress
            courseId={params.id}
            status={courseStatus}
          />
        </div>
        <div className="bg-stone-800/90 backdrop-blur-sm rounded-xl p-6 border border-stone-700 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 pixel-text">
            <div className="w-1 h-6 bg-amber-400 rounded-full"></div>
            About This Course
          </h2>
          <p className="text-stone-200 leading-relaxed text-base">
            {course.description}
          </p>
        </div>
        {user && (
            <CourseReviews
                courseId={course.id}
                owned={course.ownership === "Owned"}
                currentUsername={user.username || null}
            />
        )}
      </div>
      <div className="lg:col-span-1 space-y-5">
        {course.imageUrl && (
          <div className="bg-stone-800/90 backdrop-blur-sm rounded-xl p-3 border border-stone-700 shadow-xl">
            <img
              src={course.imageUrl}
              alt={course.courseTitle}
              className="w-full rounded-lg shadow-lg border border-stone-600/30"
            />
          </div>
        )}
          <div className="bg-stone-800/90 backdrop-blur-sm rounded-xl p-5 border border-stone-700 shadow-xl">
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
                  <p className="text-white font-semibold text-sm">
                    {course.level}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 bg-stone-800/60 rounded-lg border border-stone-700/40">
                <div className="p-2 bg-blue-400/20 rounded-lg border border-blue-400/30">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-stone-400 text-xs font-medium">Duration</p>
                  <p className="text-white font-semibold text-sm">
                    {course.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 bg-stone-800/60 rounded-lg border border-stone-700/40">
                <div className="p-2 bg-green-400/20 rounded-lg border border-green-400/30">
                  <Calendar className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-stone-400 text-xs font-medium">Created</p>
                  <p className="text-white font-semibold text-sm">
                    {new Date(course.dateCreated).toLocaleDateString("en-GB")}
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
                    <p className="text-white font-semibold text-sm">
                      {course.rating}
                    </p>
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
            </div>
          </div>

          <div className="bg-stone-800/90 backdrop-blur-sm rounded-xl p-5 border border-stone-700 shadow-xl">
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
  );
}