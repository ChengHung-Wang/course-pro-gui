import type { BaseApi } from "@/models/api";
import type { Course } from "@/models/api/course";

export interface CourseMyTargetApi extends Omit<BaseApi, "data"> {
  data: {
    id: number;
    user_id: number;
    course_id: number;
    status: "pending"; // TODO looks like only "pending" is possible
    created_at: string;
    updated_at: string;
    course: Course;
  }[];
}

// TODO post and delete
