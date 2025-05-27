'use client';

import { Pagination } from 'flowbite-react';

type Props = {
    currentPage: number;
    pageCount: number;
    pageChanged: (page: number) => void;
}

const customTheme = {
  pages: {
    base: "xs:mt-0 mt-2 inline-flex items-center gap-1",
    showIcon: "inline-flex",
    previous: {
      base: "px-3 py-1 text-sm rounded-md transition-colors bg-stone-800 border-2 border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-stone-900 font-semibold",
      icon: "w-5 h-5"
    },
    next: {
      base: "px-3 py-1 text-sm rounded-md transition-colors bg-stone-800 border-2 border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-stone-900 font-semibold",
      icon: "w-5 h-5"
    },
    selector: {
      base: "px-3 py-1 text-sm rounded-md transition-colors bg-stone-800 border-2 border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-stone-900 font-semibold mx-0.5",
      active: "bg-amber-600 text-white font-semibold border-amber-600"
    }
  }
};

export default function AppPagination({currentPage, pageCount, pageChanged}: Props) {
  return (
    <Pagination 
        theme={customTheme}
        currentPage={currentPage}
        onPageChange={(page) => pageChanged(page)}
        showIcons={true}
        totalPages={pageCount}
        layout='pagination'
        previousLabel="Previous"
        nextLabel="Next"
        className="mt-12 flex justify-center gap-2"
    />
  )
}
