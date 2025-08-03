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
  GraduationCap,
  MapPin,
  Shield,
  Palette,
  Briefcase,
  Camera,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Navbar } from "@/components/navbar"
import { Course } from "@/types"
import HeroSearchForm from "./HeroSearchForm"
import { Footer } from "@/components/Footer"


async function getData() {
  const res = await fetch("http://localhost:6001/search");
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

// Function to fetch count for a specific category
async function getCategoryCount(category: string) {
  const res = await fetch(`http://localhost:6001/search?filterBy=${category}`);
  if (!res.ok) throw new Error(`Failed to fetch count for ${category}`);
  const data = await res.json();
  return data.totalCount;
}

export default async function Home() {
  const data = await getData();
  const featuredCourses = data.result
    .sort((a: Course, b: Course) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 3);

  // Fetch counts for each category concurrently
  const [programmingCount, designCount, businessCount, photographyCount] = await Promise.all([
    getCategoryCount("Programming"),
    getCategoryCount("Design"),
    getCategoryCount("Business"),
    getCategoryCount("Photography"),
  ]);

  const categories = [
    { icon: <Book className="h-8 w-8" />, name: "Programming", count: programmingCount },
    { icon: <Palette className="h-8 w-8" />, name: "Design", count: designCount },
    { icon: <Briefcase className="h-8 w-8" />, name: "Business", count: businessCount },
    { icon: <Camera className="h-8 w-8" />, name: "Photography", count: photographyCount },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-castle-wall">
      <Navbar activePage="home" />

      <main className="flex-1">
        <section className="py-28 relative text-white">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
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
                <HeroSearchForm />
              </div>
              <div className="md:w-1/2 relative flex justify-center md:justify-end px-4">
                <div className="image-frame inline-block relative">
                  <Image
                    src="/images/castle-landscape.png"
                    alt="Castle in mountainous landscape"
                    width={500}
                    height={350}
                    className="block"
                  />

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

        <section className="py-16 bg-stone-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold mb-4 text-amber-300 pixel-text">Explore the Kingdom's Knowledge</h2>
              <p className="text-stone-300 max-w-2xl mx-auto">
                Discover courses across various domains to enhance your skills and wisdom.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
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
              <Link href="/courses">
                <Button className="btn-medieval px-8 py-6 text-lg">Begin Your Journey</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-stone-900/60 backdrop-blur-sm border-y border-stone-700">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4 text-amber-300 pixel-text">Common Inquiries</h2>
              <p className="text-stone-300 max-w-2xl mx-auto">
                Answers to questions frequently asked by curious minds throughout the realm.
              </p>
            </div>

            <div className="max-w-3xl mx-auto pb-10">
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
          </div>
        </section>
        
        <section className="py-24 relative castle-door">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
          <div className="container mx-auto px-4 text-center relative">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-amber-300 pixel-text">Become a Knowledge Bearer</h2>
              <p className="text-xl text-stone-300 mb-8">
                Share your wisdom with eager learners across the realm. Create courses and build your legacy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/courses/publish">
                  <Button className="btn-medieval px-8 py-6 text-lg">Start Teaching</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}