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
  courseTitle: string
  instructor: string
  description?: string
  category: string
  dateCreated: string
  level: string
  duration: string
  coursePrice: number
  rating: number
  imageUrl: string
  videoUrl: string
}

export type Review = {
  id: string;
  userId: string;
  courseId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};