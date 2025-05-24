export type PagedResult<T> = {
    result: T[];
    pageCount: number;
    totalCount: number;    
}

export type Course = {
  id: string
  publisher: string
  students: number
  postedAt: string
  lastUpdatedAt: string
  status: string
  courseTitle: string
  instructor: string
  description?: string
  category: string
  dateCreated: string
  level: number
  duration: string
  coursePrice: number
  ownership: string
  rating?: number
  imageUrl: string
}