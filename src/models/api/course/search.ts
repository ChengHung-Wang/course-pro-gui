import type { BaseApi } from "@/models/api";
import type { Course } from "@/models/course";

export interface CourseSearchApi extends Omit<BaseApi, "data"> {
  // The data is an Course array without some information
  data: Pick<
    Course,
    | "semester_id"
    | "points"
    | "classroom_on"
    | "original"
    | "restrict"
    | "hold_on"
    | "dimension_id"
    | "description_zh"
    | "teacher_id"
    | "updated_at"
    | "id"
  >[];
}
/* 

 */
