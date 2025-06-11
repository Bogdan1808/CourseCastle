"use client"

import Link from "next/link"
import Image from "next/image"
import CourseCard from "@/components/course-card"
import { Course } from "@/types"
import { useEffect, useState } from "react"
import ClientNavbar from "@/components/ClientNavbar"
import { getWishlistCourses } from "@/app/actions/courseActions"
import { Button } from "@/components/ui/button"
import { FunnelX } from "lucide-react"
import EmptyFilter from "@/components/EmptyFilter"
import Heading from "@/components/heading"

export default function WishlistedCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadWishlist = async () => {
      setLoading(true);
      try {
        const wishlistCourses = await getWishlistCourses();
        setCourses(wishlistCourses);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setCourses([]);
      }
      setLoading(false);
    };

    loadWishlist();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-castle-wall relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      <div className="relative z-10">
        <ClientNavbar activePage="wishlisted_courses" />

        <div className="bg-stone-900/90 text-white py-16 border-b border-stone-700">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-6 text-amber-300 pixel-text">Your Wishlist</h1>
            <p className="text-xl text-stone-300 mb-8 max-w-2xl">
              Keep track of courses you want to take. Add courses to your wishlist and enroll when you're ready.
            </p>

            {/* Simple search for wishlist */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search your wishlist..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-800 text-white rounded-lg border border-stone-600 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div onClick={() => setSearchTerm('')}>
                <Button className="h-12 btn-medieval">
                  <FunnelX className="mr-2 h-5 w-5" />
                  Clear Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-amber-300 pixel-text">
              Wishlisted Courses ({filteredCourses.length})
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-amber-300 text-xl">Loading your wishlist...</div>
            </div>
          ) : courses.length === 0 ? (
            // Empty wishlist - no courses at all
            <div className="text-center py-20">
              <div className="mb-8">
                <Image
                  src="/images/amber-castle.png"
                  alt="Empty Wishlist"
                  width={120}
                  height={120}
                  className="mx-auto opacity-50"
                />
              </div>
              <h3 className="text-2xl font-bold text-amber-300 mb-4">
                Your wishlist is empty
              </h3>
              <p className="text-stone-400 mb-8 max-w-md mx-auto">
                Browse our course catalog and add courses you're interested in to your wishlist.
              </p>
              <Link 
                href="/courses"
                className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
              >
                Browse Courses
              </Link>
            </div>
            ) : filteredCourses.length === 0 ? (
              <div className="bg-stone-900/90 text-white py-16 mt-14 rounded-lg border border-stone-600">
                <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-6">
                  <Heading title={"No results for this search"} subtitle={"Try searching something else"} center />
                  <Button onClick={() => setSearchTerm('')} className="px-6 py-2 bg-transparent text-white border border-stone-500 rounded-md hover:bg-stone-800 transition-colors">
                    Clear Search
                  </Button>
                </div>
              </div>
            ) : (
            <>
              {/* Course Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course: Course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </>
          )}
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