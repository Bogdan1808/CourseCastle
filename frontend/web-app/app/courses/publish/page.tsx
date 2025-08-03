import ClientNavbar from "@/components/ClientNavbar";
import React from "react";
import CourseForm from "../CourseForm";
import { Footer } from "@/components/Footer";

export default function Publish() {
  return (
<div className="min-h-screen bg-castle-wall relative">
  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
  <div className="relative z-10 mb-10">
    <ClientNavbar activePage="courses" />
    <div className="px-4 mt-8">
      <div className="w-[90%] max-w-none mx-auto flex flex-col md:flex-row rounded-2xl border border-stone-600 overflow-hidden bg-stone-900/90">
        <div className="md:w-1/2 w-full">
          <img
            src="/images/night-gate.jpeg"
            alt="Night Gate"
            className="w-full h-full object-cover md:rounded-l-2xl md:rounded-r-none rounded-t-2xl md:rounded-t-none"
          />
        </div>
        <div className="md:w-1/2 w-full flex items-center p-8">
          <div className="w-full">
            <CourseForm />
          </div>
        </div>
      
      </div>
    </div>
  </div>
  <Footer/>
</div>

  );
}
