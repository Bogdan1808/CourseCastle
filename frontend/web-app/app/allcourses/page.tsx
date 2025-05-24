import Link from "next/link"
import Image from "next/image"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CourseCard from "@/components/course-card"
import { Navbar } from "@/components/navbar"
import { Course } from "@/types"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

async function getData(page = 1) {
  const res = await fetch(`http://localhost:6001/search?PageSize=12&PageNumber=${page}`);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

export default async function CoursesPage({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams.page) || 1;
  const apiCourses = await getData(currentPage);

  const courses: Course[] = apiCourses.result.map((course: any) => ({
    id: course.id,
    courseTitle: course.courseTitle,
    instructor: course.instructor,
    level: course.level,
    rating: course.rating,
    students: course.studentAmmount,
    imageUrl: course.imageUrl,
    category: course.category,
  }));

  const totalPages = apiCourses.pageCount;

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
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                <Input
                  placeholder="Search for courses..."
                  className="pl-10 bg-stone-800/80 border-stone-600 text-white placeholder:text-stone-400 h-12 w-full"
                />
              </div>
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
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-amber-300 pixel-text">All Courses ({apiCourses.totalCount})</h2>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="mt-12 flex justify-center gap-2">
            <Pagination className="mt-12 ">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`?page=${Math.max(1, currentPage - 1)}`}
                    aria-disabled={currentPage === 1}
                    className="bg-stone-800 border-2 border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-stone-900 font-semibold"
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, idx) => (
                  <PaginationItem key={idx}>
                    <PaginationLink
                      href={`?page=${idx + 1}`}
                      isActive={currentPage === idx + 1}
                      className={`bg-stone-800 text-amber-300 hover:bg-amber-400 hover:text-stone-900 font-semibold border-2
                        ${currentPage === idx + 1
                          ? "border-amber-400"
                          : "border-white"
                        }`}
                    >
                      {idx + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href={`?page=${Math.min(totalPages, currentPage + 1)}`}
                    aria-disabled={currentPage === totalPages}
                    className="bg-stone-800 border-2 border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-stone-900 font-semibold"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
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
