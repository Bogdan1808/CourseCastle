import { NextResponse } from "next/server"

// This would connect to your .NET backend API
export async function GET() {
  try {
    // In a real implementation, you would fetch from your .NET API
    // const response = await fetch('https://your-dotnet-api.com/api/courses')
    // const data = await response.json()

    // For demo purposes, we'll return mock data
    const courses = [
      {
        id: 1,
        title: "The Art of Medieval Coding",
        instructor: "Sir CodeALot",
        level: "Intermediate",
        rating: 4.8,
        students: 1243,
        image: "/placeholder.svg?height=200&width=300",
        category: "Programming",
      },
      {
        id: 2,
        title: "Castle Architecture Through Ages",
        instructor: "Lady Stonecraft",
        level: "Beginner",
        rating: 4.6,
        students: 856,
        image: "/placeholder.svg?height=200&width=300",
        category: "Architecture",
      },
      // More courses...
    ]

    return NextResponse.json({ courses })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch courses from .NET backend" }, { status: 500 })
  }
}
