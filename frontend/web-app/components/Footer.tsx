import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-stone-900/80 text-stone-400 backdrop-blur-sm border-t border-stone-700 relative z-10">
      <div className="container mx-auto px-4 py-12 space-y-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-3 mb-3">
              <Image
                src="/images/amber-castle.png"
                alt="Castle Icon"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-2xl font-bold pixel-text text-amber-300">
                CourseCastle
              </span>
            </Link>
            <p className="text-base leading-relaxed">
              Empowering learners with knowledge since the digital middle ages.
            </p>
          </div>

          <nav className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 text-base font-medium">
            <FooterLink href="/" label="Home" />
            <FooterLink href="/courses" label="All Courses" />
            <FooterLink href="/courses/owned" label="Owned Courses" />
            <FooterLink href="/courses/wishlisted" label="Wishlisted Courses" />
            <FooterLink href="/courses/publish" label="Publish a Course" />
          </nav>
        </div>

        <div className="border-t border-stone-700 pt-6 text-center text-sm text-stone-500">
          &copy; {new Date().getFullYear()} CourseCastle. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="hover:text-amber-400 transition-colors"
    >
      {label}
    </Link>
  )
}
