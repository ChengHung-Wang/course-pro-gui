import type { Course } from "@/models/course";

export interface CourseTarget {
  id: number;
  user_id: number;
  tried: number;
  status: string;
  created_at: string;
  course: Course;
}
