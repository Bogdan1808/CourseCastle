import Link from "next/link"
import Image from "next/image"
import {
  Sword,
  Book,
  Crown,
  Search,
  PlusCircle,
  Award,
  Users,
  Star,
  ScrollText,
  GraduationCap,
  MapPin,
  MessageSquareQuote,
  Sparkles,
  Trophy,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import CourseCard from "@/components/course-card"
import { Navbar } from "@/components/navbar"
import { Course } from "@/types"


async function getData() {
  const res = await fetch("http://localhost:6001/search" );
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

export default async function Home() {
  const apiCourses = await getData();
  const featuredCourses = apiCourses.result
    .sort((a: Course, b: Course) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-castle-wall">
      <Navbar activePage="home" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-28 relative text-white">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="container relative mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2 space-y-6">
                <h1 className="font-medieval text-5xl font-bold leading-tight text-amber-300 pixel-text">
                  Unlock the Gates to Knowledge
                </h1>
                <p className="text-xl text-stone-200">
                  Discover courses crafted by the realm's finest instructors and forge your path to mastery.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                    <Input
                      placeholder="Search for courses..."
                      className="pl-10 bg-stone-800/80 border-stone-600 text-white placeholder:text-stone-400 h-12 w-full"
                    />
                  </div>
                  <Button className="btn-medieval h-12 px-6">Explore Courses</Button>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <div className="image-frame inline-block relative">
                  <Image
                    src="/images/castle-landscape.png"
                    alt="Castle in mountainous landscape"
                    width={500}
                    height={350}
                    className="block"
                  />

                  {/* Learn Now sticker positioned on the image */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-stone-900/90 rounded-full flex items-center justify-center p-2 rotate-12 border-4 border-amber-400 z-10">
                    <div className="text-center">
                      <div className="text-amber-300 font-bold text-sm">Learn Now</div>
                      <PlusCircle className="h-8 w-8 mx-auto mt-1 text-amber-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-stone-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold mb-4 text-amber-300 pixel-text">Explore the Kingdom's Knowledge</h2>
              <p className="text-stone-300 max-w-2xl mx-auto">
                Discover courses across various domains to enhance your skills and wisdom.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: <Book className="h-8 w-8" />, name: "Academic Studies", count: 142 },
                { icon: <Sword className="h-8 w-8" />, name: "Skill Mastery", count: 89 },
                { icon: <Crown className="h-8 w-8" />, name: "Leadership", count: 64 },
                { icon: <Shield className="h-8 w-8" />, name: "Self Defense", count: 37 },
              ].map((category, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 bg-stone-800/90 border-2 border-stone-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow torch-light"
                >
                  <div className="p-3 rounded-full bg-amber-300/20 text-amber-400 mb-4">{category.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-amber-200">{category.name}</h3>
                  <p className="text-stone-400">{category.count} courses</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Journey Section */}
        <section className="py-20 bg-stone-900/60 backdrop-blur-sm border-y border-stone-700">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4 text-amber-300 pixel-text">Your Quest for Knowledge</h2>
              <p className="text-stone-300 max-w-2xl mx-auto">
                Embark on a journey from novice to master with our structured learning paths.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  courseTitle: "Choose Your Path",
                  description: "Browse our vast library of courses and select the knowledge that calls to you.",
                  icon: <MapPin className="h-10 w-10" />,
                },
                {
                  step: "2",
                  courseTitle: "Train with Masters",
                  description: "Learn from experienced instructors who have mastered their craft.",
                  icon: <GraduationCap className="h-10 w-10" />,
                },
                {
                  step: "3",
                  courseTitle: "Earn Your Title",
                  description: "Complete courses and receive certificates to showcase your achievements.",
                  icon: <Award className="h-10 w-10" />,
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="relative p-8 bg-stone-800/90 border-2 border-stone-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-stone-900 font-bold text-xl">
                    {step.step}
                  </div>
                  <div className="pt-6 text-center">
                    <div className="p-4 rounded-full bg-amber-300/20 text-amber-400 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-amber-200">{step.courseTitle}</h3>
                    <p className="text-stone-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button className="btn-medieval px-8 py-6 text-lg">Begin Your Journey</Button>
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-16 bg-stone-900/70 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-amber-300 pixel-text">Featured Courses</h2>
              <Link href="/courses">
                <Button
                  variant="outline"
                  className="border-amber-500 bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-white font-semibold"
                >
                  View All Courses
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course: Course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* Kingdom Stats Section */}
        <section className="py-16 bg-stone-900/50 backdrop-blur-sm border-y border-stone-700">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold mb-4 text-amber-300 pixel-text">The Kingdom in Numbers</h2>
              <p className="text-stone-300 max-w-2xl mx-auto">
                Join thousands of learners who have already discovered the power of CourseCastle.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10K+", label: "Students", icon: <Users className="h-8 w-8" /> },
                { value: "500+", label: "Courses", icon: <Book className="h-8 w-8" /> },
                { value: "150+", label: "Instructors", icon: <Crown className="h-8 w-8" /> },
                { value: "95%", label: "Satisfaction", icon: <Star className="h-8 w-8" /> },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-6 bg-stone-800/90 border-2 border-stone-700 rounded-lg shadow-lg text-center"
                >
                  <div className="p-3 rounded-full bg-amber-300/20 text-amber-400 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-amber-300 mb-2">{stat.value}</div>
                  <p className="text-stone-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-stone-900/60 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4 text-amber-300 pixel-text">Tales from Our Students</h2>
              <p className="text-stone-300 max-w-2xl mx-auto">
                Hear what our noble learners have to say about their journey with CourseCastle.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "The courses at CourseCastle have transformed my skills. I've gone from a mere squire to a knight of knowledge in just months!",
                  name: "Sir Learnalot",
                  title: "Master Craftsman",
                  image: "/placeholder.svg?height=100&width=100",
                },
                {
                  quote:
                    "Never have I encountered such engaging instructors and well-structured lessons. The kingdom's finest academy, without doubt!",
                  name: "Lady Wisdom",
                  title: "Royal Advisor",
                  image: "/placeholder.svg?height=100&width=100",
                },
                {
                  quote:
                    "From the comfort of my own castle, I've acquired skills that have advanced my position in the royal court. Eternally grateful!",
                  name: "Duke Progress",
                  title: "Court Wizard",
                  image: "/placeholder.svg?height=100&width=100",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="p-8 bg-stone-800/90 border-2 border-stone-700 rounded-lg shadow-lg relative"
                >
                  <div className="absolute -top-5 -left-5 text-amber-400">
                    <MessageSquareQuote className="h-10 w-10" />
                  </div>
                  <p className="text-stone-300 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-amber-400">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-amber-200">{testimonial.name}</div>
                      <div className="text-sm text-stone-400">{testimonial.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Instructors */}
        <section className="py-20 bg-stone-900/70 backdrop-blur-sm border-y border-stone-700">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4 text-amber-300 pixel-text">Masters of the Craft</h2>
              <p className="text-stone-300 max-w-2xl mx-auto">
                Learn from the realm's most distinguished instructors, each a master in their field.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  name: "Sir CodeALot",
                  specialty: "Programming Wizard",
                  courses: 12,
                  students: 3500,
                  image: "/placeholder.svg?height=200&width=200",
                },
                {
                  name: "Lady Stonecraft",
                  specialty: "Architecture Sage",
                  courses: 8,
                  students: 2100,
                  image: "/placeholder.svg?height=200&width=200",
                },
                {
                  name: "Duke DataWise",
                  specialty: "Data Sorcerer",
                  courses: 15,
                  students: 4200,
                  image: "/placeholder.svg?height=200&width=200",
                },
                {
                  name: "Countess Creative",
                  specialty: "Design Enchantress",
                  courses: 10,
                  students: 2800,
                  image: "/placeholder.svg?height=200&width=200",
                },
              ].map((instructor, index) => (
                <div
                  key={index}
                  className="bg-stone-800/90 border-2 border-stone-700 rounded-lg shadow-lg overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={instructor.image || "/placeholder.svg"}
                      alt={instructor.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-semibold text-amber-300">{instructor.name}</h3>
                      <p className="text-stone-300 text-sm">{instructor.specialty}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between text-stone-300 mb-4">
                      <div className="flex items-center">
                        <ScrollText className="h-4 w-4 mr-1 text-amber-400" />
                        <span>{instructor.courses} courses</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-amber-400" />
                        <span>{instructor.students.toLocaleString()} students</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-amber-500 text-amber-300 hover:bg-amber-500 hover:text-stone-900"
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/instructors">
                <Button
                  variant="outline"
                  className="border-amber-500 bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-white font-semibold px-8 py-4"
                >
                  Meet All Instructors
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Achievement Badges Section */}
        <section className="py-16 bg-stone-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold mb-4 text-amber-300 pixel-text">Earn Royal Achievements</h2>
              <p className="text-stone-300 max-w-2xl mx-auto">
                Collect badges and certificates as you progress through your learning journey.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { name: "Novice Scholar", icon: <Book className="h-8 w-8" /> },
                { name: "Skilled Apprentice", icon: <Sword className="h-8 w-8" /> },
                { name: "Knowledge Knight", icon: <Shield className="h-8 w-8" /> },
                { name: "Wisdom Baron", icon: <Crown className="h-8 w-8" /> },
                { name: "Grand Master", icon: <Trophy className="h-8 w-8" /> },
              ].map((badge, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 bg-stone-800/90 border-2 border-stone-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center"
                >
                  <div className="p-4 rounded-full bg-amber-500/20 text-amber-400 mb-4 relative">
                    {badge.icon}
                    <Sparkles className="h-4 w-4 absolute top-0 right-0 text-amber-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-amber-200">{badge.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-stone-900/60 backdrop-blur-sm border-y border-stone-700">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4 text-amber-300 pixel-text">Common Inquiries</h2>
              <p className="text-stone-300 max-w-2xl mx-auto">
                Answers to questions frequently asked by curious minds throughout the realm.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {[
                  {
                    question: "How do I enroll in a course?",
                    answer:
                      "Enrolling in a course is simple! Browse our course catalog, select the course that interests you, and click the 'Enroll Now' button. You'll be guided through the payment process, after which you'll gain immediate access to the course materials.",
                  },
                  {
                    question: "Can I access courses on mobile devices?",
                    answer:
                      "Yes! CourseCastle is fully responsive and works on all devices. You can access your courses on desktop, laptop, tablet, or smartphone. We also offer offline viewing for selected content through our mobile app.",
                  },
                  {
                    question: "Do courses have a time limit?",
                    answer:
                      "Once you enroll in a course, you have lifetime access to the course materials. There are no time limits, allowing you to learn at your own pace and revisit the content whenever you need a refresher.",
                  },
                  {
                    question: "How do I become an instructor?",
                    answer:
                      "To become an instructor, click on the 'Start Teaching' button and complete our application form. Our team will review your application and course proposal. Once approved, you'll gain access to our course creation tools and instructor resources.",
                  },
                  {
                    question: "Are certificates provided upon completion?",
                    answer:
                      "Yes! Upon completing a course, you'll receive a certificate of completion that you can share on your social media profiles or add to your resume. Some courses also offer specialized certifications recognized by industry professionals.",
                  },
                ].map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-2 border-stone-700 rounded-lg overflow-hidden bg-stone-800/90"
                  >
                    <AccordionTrigger className="px-6 py-4 text-amber-200 hover:text-amber-300 font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-stone-300">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="mt-12 text-center">
              <p className="text-stone-300 mb-4">Still have questions? We're here to help!</p>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-amber-500 bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-white font-semibold"
                >
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Castle Door CTA Section */}
        <section className="py-24 relative castle-door">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
          <div className="container mx-auto px-4 text-center relative">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-amber-300 pixel-text">Become a Knowledge Bearer</h2>
              <p className="text-xl text-stone-300 mb-8">
                Share your wisdom with eager learners across the realm. Create courses and build your legacy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-medieval px-8 py-6 text-lg">Start Teaching</Button>
                <Button
                  variant="outline"
                  className="border-amber-400 bg-stone-800/50 text-amber-300 hover:bg-stone-800 hover:text-amber-200 px-8 py-6 text-lg font-semibold"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-stone-900/90 backdrop-blur-sm text-stone-400 py-12 border-t border-stone-700">
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
  )
}
