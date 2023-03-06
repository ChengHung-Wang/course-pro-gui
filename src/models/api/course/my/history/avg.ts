import type { BaseApi } from "@/models/api";
import type { Semester } from "@/models/course/semester";

export interface CourseMyHistoryAvgApi extends Omit<BaseApi, "data"> {
  data: {
    semester: Semester;
    avg: number;
  }[];
}
