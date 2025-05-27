"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, Filter, FunnelX } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CourseCard from "@/components/course-card"
import { Navbar } from "@/components/navbar"
import { Course, PagedResult } from "@/types"
import Filters from "./Filters"
import { useEffect, useState } from "react"
import { getData } from "@/app/actions/courseActions"
import AppPagination from "@/components/appPagination"
import { useParamsStore } from "@/hooks/useParamsStore"
import { useShallow } from "zustand/shallow" 
import qs from "query-string"
import SearchBar from "./SearchBar"
import FilterResetter from "./FilterResetter"

export default  function CoursesPage({ searchParams }: { searchParams: { page?: string, pageSize?: string } }) {
  const [data, setData] = useState<PagedResult<Course>>();
  const params = useParamsStore(useShallow(state => ({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
    orderBy: state.orderBy
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
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10">

        {/* Header/Navigation Bar */}
        <Navbar activePage="courses" />

        <div className="bg-stone-900/90 text-white py-16 border-b border-stone-700">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-6 text-amber-300 pixel-text">Explore Our Courses</h1>
            <p className="text-xl text-stone-300 mb-8 max-w-2xl">
              Discover the finest knowledge the realm has to offer and embark on your learning journey.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <SearchBar />
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px] bg-stone-800 border-stone-600 text-white h-12">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-stone-800 border-stone-600 text-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px] bg-stone-800 border-stone-600 text-white h-12">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent className="bg-stone-800 border-stone-600 text-white">
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Button className="h-12 btn-medieval">
                <Filter className="mr-2 h-5 w-5" />
                Filter
              </Button>
              <FilterResetter/>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-amber-300 pixel-text">All Courses ({data?.totalCount})</h2>
            <Select defaultValue="popular">
              <SelectTrigger className="w-[180px] bg-stone-800 border-stone-600 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-stone-800 border-stone-600 text-white">
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="highest">Highest Rated</SelectItem>
                <SelectItem value="lowest">Lowest Price</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filters */}
          <Filters />

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
