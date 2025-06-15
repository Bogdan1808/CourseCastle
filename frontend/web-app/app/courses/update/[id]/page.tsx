import { getDetailedViewData } from "@/app/actions/courseActions";
import Heading from "@/components/heading";
import { Navbar } from "@/components/navbar";
import React from "react";
import CourseForm from "../../CourseForm";

export default async function Update({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getDetailedViewData(id);

  return (
    <div className="min-h-screen bg-castle-wall relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
      <div className="relative z-10">
        <Navbar />
        <div className="px-4 mt-8">
          <div className="w-[90%] max-w-none mx-auto rounded-2xl border border-stone-600 overflow-hidden bg-stone-900/90">
            <div className="w-full flex items-center p-8 pb-12">
              <div className="w-full">
                <div className="mb-8">
                  <Heading
                    title="Update your course"
                    subtitle="Please update the details of your course (only this course properties can be updated)"
                    center
                  />
                </div>
                <CourseForm course={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}