import Link from "next/link"
import Image from "next/image"
import { Star, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import CourseThumbnail from "./CourseThumbnail"
import { Course } from "@/types"

type CourseCardProps = {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href ={`/courses/details/${course.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-stone-800/80 border-stone-700 hover:border-amber-700 text-white rounded-lg">
        <div className="relative h-48 w-full overflow-hidden">
          <CourseThumbnail imageUrl={course.imageUrl} />
          <Badge className="absolute top-3 right-3 bg-amber-600 hover:bg-amber-700 text-white">{course.category}</Badge>
          <Badge className="absolute bottom-3 left-3 bg-stone-900/80 text-white">{course.duration}</Badge>
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-xl line-clamp-2 text-amber-200">{course.courseTitle}</h3>
          </div>
          <p className="text-stone-400 text-sm">By {course.instructor}</p>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-stone-700/50 text-amber-100 border-stone-600 hover:bg-stone-600">
              Difficulty Level: {course.level}
            </Badge>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="fill-amber-500 h-4 w-4" />
              <span className="font-medium">{course.rating ?? 0}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-stone-700 pt-4">
          <div className="flex items-center gap-1 text-stone-400 text-sm">
            <Users className="h-4 w-4" />
            <span>{course.students.toLocaleString()} students</span>
          </div>
          {/* <Link href={`/courses/${course.id}`}>
            <Badge className="bg-amber-600 hover:bg-amber-700 cursor-pointer text-white">View Course</Badge>
          </Link> */}
        </CardFooter>
      </Card>
    </Link>
  )
}
