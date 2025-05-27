'use client'

import { Button } from '@/components/ui/button'
import { useParamsStore } from '@/hooks/useParamsStore';
import { FunnelX } from 'lucide-react'
import React from 'react'

export default function FilterResetter() {
    const reset = useParamsStore(state => state.resetParams);

    return (
        <div onClick={reset}>
            <Button className="h-12 btn-medieval">
                <FunnelX className="mr-2 h-5 w-5" />
                Remove Filters
            </Button>
        </div>
  )
}
