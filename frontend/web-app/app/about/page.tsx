import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ArchitectureDiagram from "../architecture"
import { Navbar } from "@/components/navbar"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pixel-castle">
      <Navbar activePage="about" />

      <main className="flex-1">
        <section className="relative py-20 text-white">
          <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-[2px]"></div>
          <div className="container relative mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="font-medieval text-5xl font-bold leading-tight">About CourseCastle</h1>
              <p className="text-xl text-stone-200">A medieval-themed learning platform built with modern technology</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white/90 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-stone-800">Our Mission</h2>
              <p className="text-lg text-stone-600 mb-8">
                CourseCastle was founded with a simple mission: to make learning engaging and accessible to everyone. We
                believe that education should be an adventure, and our medieval castle theme brings a unique and
                immersive experience to online learning.
              </p>

              <h2 className="text-3xl font-bold mb-6 text-stone-800">Technology Stack</h2>
              <p className="text-lg text-stone-600 mb-8">
                CourseCastle is built using a modern technology stack that combines the power of .NET on the backend
                with the flexibility and performance of Next.js on the frontend. This architecture allows us to deliver
                a fast, responsive, and secure learning experience.
              </p>

              <ArchitectureDiagram />

              <div className="mt-16">
                <h2 className="text-3xl font-bold mb-6 text-stone-800">Join Our Kingdom</h2>
                <p className="text-lg text-stone-600 mb-8">
                  Whether you're a student looking to expand your knowledge or an instructor ready to share your
                  expertise, CourseCastle welcomes you to our growing community of learners and teachers.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/courses">
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 text-lg">
                      Explore Courses
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button
                      variant="outline"
                      className="border-stone-400 text-stone-700 hover:bg-stone-100 px-8 py-6 text-lg"
                    >
                      Create Account
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-stone-900/90 backdrop-blur-sm text-stone-400 py-12">
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
                <span className="text-lg font-bold text-white">CourseCastle</span>
              </div>
              <p className="mb-4">Empowering learners with knowledge since the digital middle ages.</p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Explore</h3>
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
              <h3 className="text-white font-semibold mb-4">Company</h3>
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
              <h3 className="text-white font-semibold mb-4">Legal</h3>
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
