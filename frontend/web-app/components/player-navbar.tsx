import Link from "next/link"
import Image from "next/image"

interface PlayerNavbarProps {
  courseTitle: string
}

export function PlayerNavbar({ courseTitle }: PlayerNavbarProps) {
  return (
    <header className="border-b bg-stone-900/95 backdrop-blur-sm border-stone-700 py-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/amber-castle.png"
            alt="Castle Icon"
            width={24}
            height={24}
            className="h-6 w-6"
          />
          <span className="text-lg font-bold tracking-wider pixel-text text-amber-300">CourseCastle</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="text-sm text-stone-400">
            <span className="font-medium text-amber-300">{courseTitle.substring(0, 40)}...</span>
          </div>
        </div>
      </div>
    </header>
  )
}
