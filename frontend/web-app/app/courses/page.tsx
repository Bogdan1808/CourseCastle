"use client"

import Link from "next/link"
import Image from "next/image"
import CourseCard from "@/components/course-card"
import { Course, PagedResult } from "@/types"
import Filters from "./Filters"
import { useEffect, useState, useRef } from "react"
import { getData } from "@/app/actions/courseActions"
import AppPagination from "@/components/appPagination"
import { useParamsStore } from "@/hooks/useParamsStore"
import { useSearchParams } from 'next/navigation'
import { useShallow } from "zustand/shallow" 
import ClientNavbar from "@/components/ClientNavbar"
import qs from "query-string"
import SearchBar from "./SearchBar"
import FilterResetter from "./FilterResetter"
import CategorySelector from "./CategorySelector"
import LevelSelector from "./LevelSelector"
import EmptyFilter from "@/components/EmptyFilter"
import { Footer } from "@/components/Footer"

export default  function CoursesPage({ searchParams }: { searchParams: { page?: string, pageSize?: string } }) {
  const [data, setData] = useState<PagedResult<Course>>();
  const urlSearchParams = useSearchParams()
  const isInitialLoad = useRef(true)
  const params = useParamsStore(useShallow(state => ({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
    orderBy: state.orderBy,
    filterBy: state.filterBy,
    levelFilter: state.levelFilter,
    publisher: state.publisher,
    buyer: state.buyer
  })));

  const setParams = useParamsStore(state => state.setParams);
  const url = qs.stringifyUrl({url: '', query: params}, {skipEmptyString: true});

useEffect(() => {
  const searchTerm = urlSearchParams.get('searchTerm')
  
  if (isInitialLoad.current) {
    setParams({ searchTerm: searchTerm || '' })
    isInitialLoad.current = false
  } else if (!searchTerm) {
    setParams({ searchTerm: '' })
  }
}, [urlSearchParams, setParams])


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
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        <div className="relative z-10">
        <ClientNavbar activePage="courses" />

        <div className="bg-stone-900/90 text-white py-16 border-b border-stone-700">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-6 text-amber-300 pixel-text">Explore Our Courses</h1>
            <p className="text-xl text-stone-300 mb-8 max-w-2xl">
              Discover the finest knowledge the realm has to offer and embark on your learning journey.
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
          <Filters />
          {data?.totalCount === 0 ? (
            <EmptyFilter showReset/>
          ) : (
            
            <>         
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data?.result?.map((course: Course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>         
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
        <Footer/>
      </div>
    </div>
  )
}

