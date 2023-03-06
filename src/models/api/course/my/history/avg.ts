import type { BaseApi } from "@/models/api";
import type { Semester } from "@/models/api/course";

export interface CourseMyHistoryAvgApi extends Omit<BaseApi, "data"> {
  data: {
    semester: Semester;
    avg: number;
  }[];
}
