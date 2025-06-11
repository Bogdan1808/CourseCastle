'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useParamsStore } from '@/hooks/useParamsStore'
import { FunnelX } from 'lucide-react'

export default function FilterResetter() {
  const router = useRouter()
  const setParams = useParamsStore(state => state.setParams)

  const handleReset = () => {
    setParams({
      searchTerm: '',
      filterBy: '',
      levelFilter: '',
      orderBy: '',
      pageNumber: 1
    })
    router.push('/courses')
  }

  return (
    <Button onClick={handleReset} className="btn-medieval h-12">
      <FunnelX className="mr-2 h-5 w-5" />
      Reset Filters
    </Button>
  )
}