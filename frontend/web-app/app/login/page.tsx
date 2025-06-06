"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-castle-wall flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/90 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/90 to-transparent"></div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Image src="/images/amber-castle.png" alt="Castle Icon" width={48} height={48} className="h-12 w-12" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-amber-300 pixel-text">
          Enter the CourseCastle Gates
        </h2>
        <p className="mt-2 text-center text-sm text-stone-300">
          Or{" "}
          <Link href="/signup" className="font-medium text-amber-400 hover:text-amber-300 transition-colors">
            request access to the kingdom
          </Link>
        </p>
      </div>

      <div className="relative z-10 mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-stone-900/95 py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 border-2 border-stone-700/50 card-medieval backdrop-blur-sm">
          <div className="space-y-6">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-amber-200">
                Email address
              </Label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-stone-600 bg-stone-800/90 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-white"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-amber-200">
                Password
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-stone-600 bg-stone-800/90 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-white pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-stone-400 hover:text-stone-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-stone-400 hover:text-stone-300" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox id="remember-me" className="border-amber-500 text-amber-500" />
                <Label htmlFor="remember-me" className="ml-2 block text-sm text-stone-300">
                  Remember me
                </Label>
              </div>

              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button className="w-full btn-medieval py-6 text-lg font-semibold">Sign in to the Castle</Button>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-stone-900 text-stone-300">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-stone-600 bg-stone-800/50 text-stone-300 hover:bg-stone-700 hover:text-white transition-colors"
              >
                Google
              </Button>
              <Button
                variant="outline"
                className="border-stone-600 bg-stone-800/50 text-stone-300 hover:bg-stone-700 hover:text-white transition-colors"
              >
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
