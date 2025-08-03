import { getDetailedViewData } from "@/app/actions/courseActions";
import { getCurrentUser } from "@/app/actions/authActions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import LearnClient from "./LearnClient";

type Props = {
  params: { id: string };
};

export default async function LearnPage({ params }: Props) {
  const course = await getDetailedViewData(params.id);
  const user = await getCurrentUser();

  if (!course) {
    return notFound();
  }

  if (
    !user ||
    (course.ownership !== "Owned" && course.status === "NotStarted")
  ) {
    redirect(`/courses/details/${params.id}`);
  }

  return (
    <div className="min-h-screen bg-castle-wall relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Header */}
          <div className="mb-6">
            <Link
              href={`/courses/details/${params.id}`}
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors mb-4 text-base font-medium group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Course Details
            </Link>
            <div className="bg-stone-800/90 backdrop-blur-sm rounded-xl p-5 border border-stone-700 shadow-2xl">
              <h1 className="text-3xl font-bold text-white mb-2 leading-tight pixel-text">
                {course.courseTitle}
              </h1>
              <p className="text-stone-300 text-lg">
                by{" "}
                <span className="text-amber-400 font-semibold">
                  {course.instructor}
                </span>
              </p>
            </div>
          </div>
          <LearnClient course={course} params={params} />
        </div>
      </div>
    </div>
  );
}