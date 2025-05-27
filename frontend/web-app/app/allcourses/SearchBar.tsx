'use client'

import { useParamsStore } from '@/hooks/useParamsStore';
import { Search } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'

export default function SearchBar() {
  const setParams = useParamsStore(state => state.setParams);
  const searchTerm = useParamsStore(state => state.searchTerm);
  const [value, setValue] = useState('');

  useEffect(() => {
    if(searchTerm === '') setValue('');
  }, [searchTerm]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSearch() {
    setParams({ searchTerm: value });
  }

  return (
    <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
        <input
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          onChange={handleChange}
          value={value}
          type="text"
          placeholder="Search for courses..."
          className="
            pl-10
            bg-stone-800/80 
            border border-stone-600 
            text-white 
            placeholder:text-stone-400 
            h-12 
            w-full
            rounded-md
          "
        />
    </div>
  )
}
