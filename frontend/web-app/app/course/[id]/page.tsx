import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Shield, Star, Users, ChevronRight, Play, BookOpen, Clock, Award, CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"

export default function CoursePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("curriculum")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // This would normally be fetched from a database
  const course = {
    id: params.id,
    title: "The Art of Medieval Coding",
    description:
      "Master the ancient arts of programming with modern tools. This comprehensive course will take you from novice to knight in the realm of code.",
    instructor: "Sir CodeALot",
    instructorTitle: "Master Developer",
    instructorImage: "/placeholder.svg?height=100&width=100",
    level: "Intermediate",
    rating: 4.8,
    reviews: 342,
    students: 1243,
    lastUpdated: "March 2023",
    language: "English",
    duration: "24 hours",
    image: "/placeholder.svg?height=400&width=800",
    price: 89.99,
    discountPrice: 49.99,
    category: "Programming",
    tags: ["Web Development", "JavaScript", "React", "Next.js"],
    includes: [
      "24 hours on-demand video",
      "15 coding exercises",
      "5 practical projects",
      "Full lifetime access",
      "Access on mobile and TV",
      "Certificate of completion",
    ],
    sections: [
      {
        title: "Introduction to the Kingdom of Code",
        lessons: [
          { title: "Welcome to the Course", duration: "5:22", preview: true },
          { title: "Setting Up Your Development Environment", duration: "12:45", preview: false },
          { title: "Understanding the Basics", duration: "18:30", preview: false },
        ],
      },
      {
        title: "The Fundamentals of Castle Building",
        lessons: [
          { title: "HTML: The Foundation Stones", duration: "22:15", preview: false },
          { title: "CSS: The Castle Decorations", duration: "25:40", preview: false },
          { title: "JavaScript: The Castle Mechanics", duration: "30:12", preview: false },
          { title: "Responsive Design: Fortifying Your Castle", duration: "28:55", preview: false },
        ],
      },
      {
        title: "Advanced Techniques of the Royal Engineers",
        lessons: [
          { title: "React: The Royal Framework", duration: "35:18", preview: false },
          { title: "State Management: The Castle Treasury", duration: "40:22", preview: false },
          { title: "API Integration: Communicating with Other Kingdoms", duration: "32:45", preview: false },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-castle-wall">
      {/* Fixed Header */}
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

          <h1 className="text-4xl font-bold mb-4 text-amber-300 pixel-text">{course.title}</h1>
          <p className="text-xl text-stone-300 mb-6 max-w-3xl">{course.description}</p>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
              <span className="ml-1 font-medium">{course.rating}</span>
              <span className="ml-1 text-stone-300">({course.reviews} reviews)</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-stone-300" />
              <span className="ml-1 text-stone-300">{course.students} students</span>
            </div>
            <Badge className="bg-stone-700 text-stone-200">{course.level}</Badge>
            <Badge className="bg-stone-700 text-stone-200">{course.language}</Badge>
          </div>

          <div className="flex items-center mb-6">
            <Image
              src={course.instructorImage || "/placeholder.svg"}
              alt={course.instructor}
              width={48}
              height={48}
              className="rounded-full border-2 border-amber-400"
            />
            <div className="ml-3">
              <div className="font-medium text-amber-200">{course.instructor}</div>
              <div className="text-sm text-stone-300">{course.instructorTitle}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Fixed Sidebar */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8 bg-stone-800 p-1 border border-stone-700">
                <TabsTrigger
                  value="curriculum"
                  className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                >
                  Curriculum
                </TabsTrigger>
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="curriculum"
                className="bg-stone-800/80 rounded-lg shadow-sm border border-stone-700 p-6 text-white"
              >
                <h2 className="text-2xl font-bold mb-6 text-amber-300">Course Content</h2>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-stone-300 mb-2">
                    <span>{course.sections.reduce((acc, section) => acc + section.lessons.length, 0)} lessons</span>
                    <span>{course.duration} total length</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {course.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border border-stone-700 rounded-md overflow-hidden">
                      <div className="bg-stone-700/50 p-4 font-medium flex justify-between items-center">
                        <h3 className="text-amber-200">{section.title}</h3>
                        <span className="text-sm text-stone-300">{section.lessons.length} lessons</span>
                      </div>
                      <div className="divide-y divide-stone-700">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className="p-4 flex justify-between items-center hover:bg-stone-700/30 transition-colors"
                          >
                            <div className="flex items-start">
                              {lesson.preview ? (
                                <Play className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                              ) : (
                                <Lock className="h-5 w-5 text-stone-500 mr-3 mt-0.5" />
                              )}
                              <div>
                                <div className="font-medium">{lesson.title}</div>
                                {lesson.preview && (
                                  <Badge className="mt-1 bg-amber-600/20 text-amber-400 hover:bg-amber-600/30 border border-amber-600/50">
                                    Preview
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-sm text-stone-400">{lesson.duration}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent
                value="overview"
                className="bg-stone-800/80 rounded-lg shadow-sm border border-stone-700 p-6 text-white"
              >
                <h2 className="text-2xl font-bold mb-6 text-amber-300">Course Overview</h2>
                <div className="prose prose-invert max-w-none">
                  <p>
                    Welcome to "The Art of Medieval Coding" – a comprehensive journey through the realm of modern web
                    development with a medieval twist. This course is designed to transform you from a coding squire to
                    a full-stack knight.
                  </p>
                  <h3 className="text-amber-200 mt-6 mb-3 text-xl font-semibold">What you'll learn</h3>
                  <ul className="space-y-2 list-disc pl-5 text-stone-300">
                    <li>Master HTML, CSS, and JavaScript – the foundation stones of web development</li>
                    <li>Build responsive and interactive web applications</li>
                    <li>Understand modern frameworks like React and Next.js</li>
                    <li>Implement state management and API integration</li>
                    <li>Deploy your applications to the world</li>
                  </ul>
                  <h3 className="text-amber-200 mt-6 mb-3 text-xl font-semibold">Requirements</h3>
                  <ul className="space-y-2 list-disc pl-5 text-stone-300">
                    <li>Basic computer skills and familiarity with web browsing</li>
                    <li>No prior coding experience required – we start from the basics</li>
                    <li>A computer with internet access</li>
                    <li>Enthusiasm and willingness to practice</li>
                  </ul>
                  <h3 className="text-amber-200 mt-6 mb-3 text-xl font-semibold">Who this course is for</h3>
                  <ul className="space-y-2 list-disc pl-5 text-stone-300">
                    <li>Beginners looking to enter the world of web development</li>
                    <li>Designers wanting to expand their skills into coding</li>
                    <li>Professionals seeking to update their web development knowledge</li>
                    <li>Anyone interested in building their own websites or web applications</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent
                value="reviews"
                className="bg-stone-800/80 rounded-lg shadow-sm border border-stone-700 p-6 text-white"
              >
                <h2 className="text-2xl font-bold mb-6 text-amber-300">Student Reviews</h2>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="text-center bg-stone-700/50 p-6 rounded-lg border border-stone-700">
                      <div className="text-5xl font-bold text-amber-500">{course.rating}</div>
                      <div className="flex justify-center my-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(course.rating) ? "text-amber-400 fill-amber-400" : "text-stone-600"}`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-stone-400">Course Rating</div>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <div className="space-y-6">
                      {[
                        {
                          name: "Lady Websmith",
                          rating: 5,
                          date: "2 months ago",
                          comment:
                            "Absolutely brilliant course! Sir CodeALot explains complex concepts in a way that's easy to understand. I've gone from knowing nothing about coding to building my own web applications.",
                        },
                        {
                          name: "Duke DataWise",
                          rating: 4,
                          date: "3 months ago",
                          comment:
                            "Great content and well-structured lessons. The medieval theme makes learning fun and engaging. Would recommend to anyone starting their coding journey.",
                        },
                        {
                          name: "Squire Learnsalot",
                          rating: 5,
                          date: "1 month ago",
                          comment:
                            "This course transformed my understanding of web development. The projects are practical and the instructor's support is outstanding.",
                        },
                      ].map((review, index) => (
                        <div key={index} className="border-b border-stone-700 pb-6 last:border-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-medium text-amber-200">{review.name}</div>
                              <div className="text-xs text-stone-400">{review.date}</div>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-stone-600"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-stone-300">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-28">
              <div className="bg-stone-800/90 rounded-lg shadow-md p-6 border-2 border-stone-700 card-medieval backdrop-blur-sm">
                <div className="relative aspect-video mb-6 rounded-md overflow-hidden image-frame">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
                    <Button className="rounded-full w-16 h-16 bg-amber-500 hover:bg-amber-600">
                      <Play className="h-8 w-8 text-white" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-amber-300">${course.discountPrice}</span>
                  <span className="ml-2 text-xl line-through text-stone-500">${course.price}</span>
                  <span className="ml-2 text-green-500 font-medium">
                    {Math.round((1 - course.discountPrice / course.price) * 100)}% off
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-stone-300">Sale ends in:</span>
                    <span className="font-medium text-amber-300">2 days left!</span>
                  </div>
                  <Progress value={33} className="h-2 bg-stone-700" indicatorClassName="bg-amber-500" />
                </div>

                <Button className="w-full btn-medieval mb-3 py-6 text-lg">Enroll Now</Button>

                <Button
                  variant="outline"
                  className="w-full border-stone-600 text-stone-300 hover:bg-stone-700 mb-6 py-6"
                >
                  Try Free Preview
                </Button>

                <div className="text-sm text-stone-300 mb-6">
                  <div className="font-medium text-amber-300 mb-2">This course includes:</div>
                  <ul className="space-y-3">
                    {course.includes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center text-sm text-stone-400 border-t border-stone-700 pt-4">
                  <span>30-Day Money-Back Guarantee</span>
                </div>
              </div>

              {/* Course Stats Card */}
              <div className="mt-6 bg-stone-800/90 rounded-lg shadow-md p-6 border-2 border-stone-700 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 text-amber-300">Course Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-amber-500 mr-3" />
                    <div>
                      <div className="text-sm text-stone-400">Total Lessons</div>
                      <div className="font-medium text-white">
                        {course.sections.reduce((acc, section) => acc + section.lessons.length, 0)} lessons
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-amber-500 mr-3" />
                    <div>
                      <div className="text-sm text-stone-400">Total Duration</div>
                      <div className="font-medium text-white">{course.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-amber-500 mr-3" />
                    <div>
                      <div className="text-sm text-stone-400">Skill Level</div>
                      <div className="font-medium text-white">{course.level}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-amber-500 mr-3" />
                    <div>
                      <div className="text-sm text-stone-400">Enrolled Students</div>
                      <div className="font-medium text-white">{course.students.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags Card */}
              <div className="mt-6 bg-stone-800/90 rounded-lg shadow-md p-6 border-2 border-stone-700 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 text-amber-300">Course Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="border-amber-600 text-amber-400 bg-amber-900/20">
                      {tag}
                    </Badge>
                  ))}
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
                <Shield className="h-6 w-6 text-amber-400" />
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
  )
}
