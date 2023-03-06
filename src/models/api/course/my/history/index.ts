import type { BaseApi } from "@/models/api";
import type { Course } from "@/models/course";

export interface CourseMyHistoryApi extends Omit<BaseApi, "data"> {
  data: {
    id: string;
    rating: string;
    user_id: string;
    course_id: string;
    notes: string | null; // TODO no examples
    course: Course;
  }[];
}
