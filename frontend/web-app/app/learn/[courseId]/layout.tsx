import type React from "react"
export default function CourseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-stone-900">{children}</div>
}
