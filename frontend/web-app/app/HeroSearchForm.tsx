'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function HeroSearchForm() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/courses?searchTerm=${encodeURIComponent(searchTerm.trim())}`)
    } else {
      router.push('/courses')
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 pt-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
        <Input
          placeholder="Search for courses..."
          className="pl-10 bg-stone-800/80 border-stone-600 text-white placeholder:text-stone-400 h-12 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button type="submit" className="btn-medieval h-12 px-6">
        Explore Courses
      </Button>
    </form>
  )
}