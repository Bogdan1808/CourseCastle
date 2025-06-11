"use client"

import Link from "next/link"
import Image from "next/image"
import CourseCard from "@/components/course-card"
import { Course, PagedResult } from "@/types"
import Filters from "../Filters"
import { useEffect, useState } from "react"
import { getData } from "@/app/actions/courseActions"
import AppPagination from "@/components/appPagination"
import { useParamsStore } from "@/hooks/useParamsStore"
import { useShallow } from "zustand/shallow" 
import ClientNavbar from "@/components/ClientNavbar"
import qs from "query-string"
import SearchBar from "../SearchBar"
import FilterResetter from "../FilterResetter"
import CategorySelector from "../CategorySelector"
import LevelSelector from "../LevelSelector"
import EmptyFilter from "@/components/EmptyFilter"

export default  function CoursesPage({ searchParams }: { searchParams: { page?: string, pageSize?: string } }) {
  const [data, setData] = useState<PagedResult<Course>>();
  const params = useParamsStore(useShallow(state => ({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
    orderBy: state.orderBy,
    filterBy: state.filterBy,
    levelFilter: state.levelFilter,
    publisher: state.publisher,
    buyer: state.buyer,
    statusFilter: "owned"
  })));

  const setParams = useParamsStore(state => state.setParams);
  const url = qs.stringifyUrl({url: '', query: params}, {skipEmptyString: true});

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  useEffect(() => {
    getData(url).then((data) => {
      setData(data);
    });
  }, [url]);

  return (
      <div className="min-h-screen bg-castle-wall relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
        <div className="relative z-10">

        <ClientNavbar activePage="owned_courses" />

        <div className="bg-stone-900/90 text-white py-16 border-b border-stone-700">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-6 text-amber-300 pixel-text">Explore Your Owned Courses</h1>
            <p className="text-xl text-stone-300 mb-8 max-w-2xl">
              Continue your learning journey with the courses you own.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <SearchBar/>
              <CategorySelector/>
              <LevelSelector/>
              <FilterResetter/>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-amber-300 pixel-text">All Courses ({data?.totalCount})</h2>
          </div>
          {/* Filters */}
          <Filters />
          {data?.totalCount === 0 ? (
            <EmptyFilter showReset/>
          ) : (
            
            <>         
              {/* Course Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data?.result?.map((course: Course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>         
              {/* Pagination */}
              <div className="flex justify-center mt-4">
                  {data && (
                    <AppPagination
                      pageChanged={setPageNumber}
                      currentPage={params.pageNumber}
                      pageCount={data.pageCount}
                    />
                  )}
              </div>
            </>
          )};
        </div>
        {/* Footer */}
        <footer className="bg-stone-900/90 backdrop-blur-sm text-stone-400 py-12 border-t border-stone-700 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Image
                    src="/images/amber-castle.png"
                    alt="Castle Icon"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  <span className="text-lg font-bold text-amber-300 pixel-text">CourseCastle</span>
                </div>
                <p className="mb-4">Empowering learners with knowledge since the digital middle ages.</p>
              </div>

              <div>
                <h3 className="text-amber-300 font-semibold mb-4">Explore</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/courses" className="hover:text-amber-400 transition-colors">
                      All Courses
                    </Link>
                  </li>
                  <li>
                    <Link href="/instructors" className="hover:text-amber-400 transition-colors">
                      Instructors
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:text-amber-400 transition-colors">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-amber-300 font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="hover:text-amber-400 transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="hover:text-amber-400 transition-colors">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-amber-400 transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-amber-300 font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/terms" className="hover:text-amber-400 transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-amber-400 transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookies" className="hover:text-amber-400 transition-colors">
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-stone-700 mt-8 pt-8 text-center">
              <p>&copy; {new Date().getFullYear()} CourseCastle. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
