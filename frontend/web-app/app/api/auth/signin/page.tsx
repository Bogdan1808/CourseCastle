import ClientNavbar from '@/components/ClientNavbar'
import EmptyFilter from '@/components/EmptyFilter'
import React from 'react'

export default function SigIn({searchParams}: {searchParams: {callbackUrl: string}}) {
  return (
    <div className="relative min-h-screen bg-castle-wall">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-0 pointer-events-none"></div>
      <div className="relative z-10">
        <ClientNavbar activePage="login" />
        <div className="mt-16 flex flex-col items-center">
          <div className="w-full max-w-4xl px-8 py-16">
            <EmptyFilter
              title='You must be logged in to access this page'
              subtitle='Please click below to login'
              showLogin
              callbackUrl={searchParams.callbackUrl}
            />
          </div>
        </div>
      </div>
    </div>
  )
}