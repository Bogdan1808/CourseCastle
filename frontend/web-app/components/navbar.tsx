import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  activePage?: "home" | "courses" | "instructors" | "about" | "login" | "signup"
}

export function Navbar({ activePage }: NavbarProps) {
  return (
    <header className="border-b bg-stone-900/80 text-white backdrop-blur-sm border-stone-700 relative z-10">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/amber-castle.png"
            alt="Castle Icon"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-xl font-bold tracking-wider pixel-text text-amber-300">CourseCastle</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`${
              activePage === "home" ? "text-amber-400 font-semibold" : "text-stone-200"
            } hover:text-amber-400 transition-colors`}
          >
            Home
          </Link>
          <Link
            href="/allcourses"
            className={`${
              activePage === "courses" ? "text-amber-400 font-semibold" : "text-stone-200"
            } hover:text-amber-400 transition-colors`}
          >
            Courses
          </Link>
          <Link
            href="/instructors"
            className={`${
              activePage === "instructors" ? "text-amber-400 font-semibold" : "text-stone-200"
            } hover:text-amber-400 transition-colors`}
          >
            Instructors
          </Link>
          <Link
            href="/about"
            className={`${
              activePage === "about" ? "text-amber-400 font-semibold" : "text-stone-200"
            } hover:text-amber-400 transition-colors`}
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button
              variant="outline"
              className="bg-stone-800 border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-stone-900 font-semibold"
            >
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="btn-medieval">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
