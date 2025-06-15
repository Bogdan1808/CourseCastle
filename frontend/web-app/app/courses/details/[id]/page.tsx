import { getDetailedViewData } from '@/app/actions/courseActions';
import Heading from '@/components/heading';
import { Navbar } from '@/components/navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, BookOpen, Calendar, CheckCircle, ChevronRight, Clock, Delete, Euro, Star, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import EditButton from './EditButton';
import { getCurrentUser } from '@/app/actions/authActions';
import WishlistButton from './WishlistButton';
import DeleteButton from './DeleteButton';

const formatDuration = (duration: string) => {
  const [hours, minutes] = duration.split(":")
  const totalHours = Number.parseInt(hours)
  const totalMinutes = Number.parseInt(minutes)

  if (totalHours > 0) {
    return `${totalHours}h ${totalMinutes}m`
  }
  return `${totalMinutes}m`
}

const formatPrice = (price: number) => {
  return `${(price / 100).toFixed(2)}`
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const getOwnershipColor = (ownership: string) => {
  switch (ownership) {
    case "Owned":
      return "bg-green-600 hover:bg-green-700"
    case "Wishlisted":
      return "bg-amber-600 hover:bg-amber-700"
    default:
      return "bg-stone-600 hover:bg-stone-700"
  }
}

export default async function Details({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await getDetailedViewData(id);
  const user = await getCurrentUser();

    if (!course) {
    return (
      <div className="min-h-screen bg-castle-wall relative">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10">
          <Navbar />
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-amber-300 mb-4">Course Not Found</h1>
              <p className="text-stone-300 mb-6">The course you are looking for does not exist.</p>
              <Link href="/courses">
                <Button className="btn-medieval">Back to Courses</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

return (
    <div className="min-h-screen bg-castle-wall relative">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10">
        <Navbar />

        {/* Course Header */}
        <div className="pt-24 pb-8 bg-stone-900/80 text-white border-b border-stone-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm mb-4">
              <Link href="/" className="text-stone-300 hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-stone-400" />
              <Link href="/courses" className="text-stone-300 hover:text-white">
                Courses
              </Link>
              <ChevronRight className="h-4 w-4 text-stone-400" />
              <span className="text-amber-400">{course.category}</span>
            </div>

            <h1 className="text-4xl font-bold mb-4 text-amber-300 pixel-text">{course.courseTitle}</h1>
            <p className="text-xl text-stone-300 mb-6 max-w-3xl">{course.description}</p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                <span className="ml-1 font-medium">{course.rating}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-stone-300" />
                <span className="ml-1 text-stone-300">{course.students.toLocaleString()} students</span>
              </div>
              <Badge className="bg-stone-700 text-stone-200">{course.level}</Badge>
              <Badge className={`text-white ${getOwnershipColor(course.ownership)}`}>
                {course.ownership === "NotOwned" ? "Available" : course.ownership}
              </Badge>
            </div>

            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-stone-900 font-bold text-lg mr-3">
                {course.instructor.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-amber-200">{course.instructor}</div>
                <div className="text-sm text-stone-300">Published by {course.publisher}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content with Fixed Sidebar */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Area */}
            <div className="lg:w-2/3">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full md:w-auto grid-cols-2 mb-8 bg-stone-800 p-1 border border-stone-700">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                  >
                    Details
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="overview"
                  className="bg-stone-800/80 rounded-lg shadow-sm border border-stone-700 p-6 text-white"
                >
                  <h2 className="text-2xl font-bold mb-6 text-amber-300">Course Overview</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-stone-300 text-lg leading-relaxed mb-6">{course.description}</p>

                    <h3 className="text-amber-200 mt-6 mb-3 text-xl font-semibold">What you'll learn</h3>
                    <ul className="space-y-2 list-disc pl-5 text-stone-300">
                      <li>Comprehensive understanding of {course.category.toLowerCase()} concepts</li>
                      <li>Practical skills applicable to real-world scenarios</li>
                      <li>Industry best practices and modern techniques</li>
                      <li>Hands-on experience through practical exercises</li>
                    </ul>

                    <h3 className="text-amber-200 mt-6 mb-3 text-xl font-semibold">Course Requirements</h3>
                    <ul className="space-y-2 list-disc pl-5 text-stone-300">
                      <li>Basic computer skills and internet access</li>
                      <li>Enthusiasm and willingness to learn</li>
                      <li>No prior experience required for {course.level.toLowerCase()} level courses</li>
                    </ul>

                    <h3 className="text-amber-200 mt-6 mb-3 text-xl font-semibold">Who this course is for</h3>
                    <ul className="space-y-2 list-disc pl-5 text-stone-300">
                      <li>{course.level} learners looking to advance their skills</li>
                      <li>Professionals seeking to update their knowledge in {course.category}</li>
                      <li>Anyone interested in {course.category.toLowerCase()} and related fields</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent
                  value="details"
                  className="bg-stone-800/80 rounded-lg shadow-sm border border-stone-700 p-6 text-white"
                >
                  <h2 className="text-2xl font-bold mb-6 text-amber-300">Course Details</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 text-amber-500 mr-3" />
                        <div>
                          <div className="text-sm text-stone-400">Category</div>
                          <div className="font-medium text-white">{course.category}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-amber-500 mr-3" />
                        <div>
                          <div className="text-sm text-stone-400">Duration</div>
                          <div className="font-medium text-white">{formatDuration(course.duration)}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-amber-500 mr-3" />
                        <div>
                          <div className="text-sm text-stone-400">Skill Level</div>
                          <div className="font-medium text-white">{course.level}</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-amber-500 mr-3" />
                        <div>
                          <div className="text-sm text-stone-400">Students Enrolled</div>
                          <div className="font-medium text-white">{course.students.toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-amber-500 mr-3" />
                        <div>
                          <div className="text-sm text-stone-400">Created</div>
                          <div className="font-medium text-white">{formatDate(course.dateCreated)}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-amber-500 mr-3" />
                        <div>
                          <div className="text-sm text-stone-400">Last Updated</div>
                          <div className="font-medium text-white">{formatDate(course.lastUpdatedAt)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Fixed Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-28">
                <div className="bg-stone-800/90 rounded-lg shadow-md p-6 border-2 border-stone-700 backdrop-blur-sm">
                  <div className="relative aspect-video mb-6 rounded-md overflow-hidden">
                    <Image
                      src="/images/CCplaceholder.png"
                      alt={course.courseTitle}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex items-center mb-4">
                    <Euro className="h-6 w-6 text-amber-400 mr-2" />
                    <span className="text-3xl font-bold text-amber-300">{formatPrice(course.coursePrice)}</span>
                  </div>


                  {user?.username === course.publisher ? (
                    <>
                      <EditButton id={course.id} />
                      <DeleteButton id={course.id} />
                    </>
                  ) : course.ownership === "Owned" && course.status === "Started" ? (
                    <Link href={`/learn/${course.id}`}>
                      <Button className="w-full btn-medieval mb-3 py-6 text-lg">Continue Learning</Button>
                    </Link>
                  ) : course.ownership === "Owned" ? (
                    <Link href={`/learn/${course.id}`}>
                      <Button className="w-full btn-medieval mb-3 py-6 text-lg">Start Learning</Button>
                    </Link>
                  ) : (
                    <div className="space-y-3">
                      <Button className="w-full btn-medieval py-6 text-lg">Enroll Now</Button>
                      <WishlistButton 
                        courseId={course.id} 
                        isWishlisted={course.ownership === "Wishlisted"} 
                      />
                    </div>
                  )}

                  <div className="text-sm text-stone-300 mt-6">
                    <div className="font-medium text-amber-300 mb-2">This course includes:</div>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{formatDuration(course.duration)} of content</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Full lifetime access</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Access on mobile and desktop</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Certificate of completion</span>
                      </li>
                    </ul>
                  </div>

                  <div className="text-center text-sm text-stone-400 border-t border-stone-700 pt-4 mt-6">
                    <span>30-Day Money-Back Guarantee</span>
                  </div>
                </div>

                {/* Course Stats Card */}
                <div className="mt-6 bg-stone-800/90 rounded-lg shadow-md p-6 border-2 border-stone-700 backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-4 text-amber-300">Course Information</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Publisher:</span>
                      <span className="text-white font-medium">{course.publisher}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Status:</span>
                      <Badge
                        className={`${course.status === "Completed" ? "bg-green-600" : course.status === "Started" ? "bg-amber-600" : "bg-stone-600"}`}
                      >
                        {course.status === "NotStarted" ? "Not Started" : course.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Rating:</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
                        <span className="text-white font-medium">{course.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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


