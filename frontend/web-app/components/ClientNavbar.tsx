'use client'

import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import LoginButton from "./LoginButton"
import UserActions from "./UserActions"

interface ClientNavbarProps {
  activePage?: "home" | "courses" | "owned_courses" | "wishlisted_courses" |"about"
}

export default function ClientNavbar({ activePage }: ClientNavbarProps) {
  const { data: session } = useSession()
  const user = session?.user

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
            href="/courses"
            className={`${
              activePage === "courses" ? "text-amber-400 font-semibold" : "text-stone-200"
            } hover:text-amber-400 transition-colors`}
          >
            Courses
          </Link>
          <Link
            href="/courses/owned"
            className={`${
              activePage === "owned_courses" ? "text-amber-400 font-semibold" : "text-stone-200"
            } hover:text-amber-400 transition-colors`}
          >
            Owned Courses
          </Link>
          <Link
            href="/courses/wishlisted"
            className={`${
              activePage === "wishlisted_courses" ? "text-amber-400 font-semibold" : "text-stone-200"
            } hover:text-amber-400 transition-colors`}
          >
            Wishlisted Courses
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

        {user ? (
          <UserActions user={user}/>
        ) : (
          <div className="flex items-center gap-4">
            <LoginButton/>
          </div>
        )}

      </div>
    </header>
  )
}