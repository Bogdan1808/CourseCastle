'use client'

import { Button, Dropdown, DropdownDivider, DropdownItem } from 'flowbite-react'
import Link from 'next/link'
import { User } from 'next-auth'
import { HiClipboardDocumentList, HiCog, HiDocumentArrowUp, HiUser } from 'react-icons/hi2'
import React, { use } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { signOut } from 'next-auth/react'
import { useParamsStore } from '@/hooks/useParamsStore'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  user: User
}

export default function UserActions({ user }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const setParams = useParamsStore(state => state.setParams);

  function setBuyer(){
    setParams({buyer: user.username, publisher: undefined});
    if(pathname !== '/courses'){
      router.push('/courses');
    }
  }

  function setPublisher(){
    setParams({publisher: user.username, buyer: undefined});
      if(pathname !== '/courses'){
      router.push('/courses');
    }
  }

  return (
    <Dropdown 
      inline 
      label={`Welcome ${user.name}`} 
      className='cursor-pointer'
      theme={{
        inlineWrapper: "bg-stone-800 border border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-stone-900 font-semibold px-4 py-2 rounded transition-all duration-200",
        floating: {
          base: "z-50 w-fit rounded-md shadow-lg focus:outline-none !bg-stone-800 !border !border-amber-400",
          content: "py-2 text-sm !bg-stone-800",
          divider: "my-1 h-px !bg-stone-600",
          item: {
            base: "flex items-center justify-start py-3 px-4 text-sm !text-amber-300 cursor-pointer w-full hover:!bg-stone-700 hover:!text-amber-200 hover:!shadow-md hover:!border-l-4 hover:!border-l-amber-400 transition-all duration-200 !focus:bg-stone-700 !focus:text-amber-200",
            icon: "mr-3 h-4 w-4"
          }
        }
      }}
    >
      <DropdownItem 
        icon={HiUser}
        className="!text-white hover:!bg-stone-700 hover:!text-amber-200 hover:!shadow-md hover:!border-l-4 hover:!border-l-amber-400 !transition-all !duration-200"
        onClick={setBuyer}
      >
        My profile
      </DropdownItem>
      <DropdownItem 
        icon={HiClipboardDocumentList}
        className="!text-white hover:!bg-stone-700 hover:!text-amber-200 hover:!shadow-md hover:!border-l-4 hover:!border-l-amber-400 !transition-all !duration-200"
        onClick={setPublisher}
      >
        My courses
      </DropdownItem>
      <DropdownItem 
        icon={HiDocumentArrowUp}
        className="!text-white hover:!bg-stone-700 hover:!text-amber-200 hover:!shadow-md hover:!border-l-4 hover:!border-l-amber-400 !transition-all !duration-200"
      >
        <Link href='/courses/publish'>
          Publish a course
        </Link>
      </DropdownItem>
      <DropdownItem 
        icon={HiCog}
        className="!text-white hover:!bg-stone-700 hover:!text-amber-200 hover:!shadow-md hover:!border-l-4 hover:!border-l-amber-400 !transition-all !duration-200"
      >
        <Link href='/session'>
          Session (dev only!)
        </Link>
      </DropdownItem>
      <DropdownDivider className="!bg-stone-600" />
      <DropdownItem 
        icon={AiOutlineLogout} 
        onClick={() => signOut({redirectTo: '/'})}
        className="!text-white hover:!bg-stone-700 hover:!text-amber-200 hover:!shadow-md hover:!border-l-4 hover:!border-l-amber-400 !transition-all !duration-200"
      >
        Sign out
      </DropdownItem>
    </Dropdown>
  )
}