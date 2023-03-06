import type { BaseApi, GpaNames } from "@/models/api";
import type { Course } from "@/models/api/course";

interface TimelineSession {
  id: number;
  name: string;
  start_at: string;
  end_at: string;
  hold_on: string;
}

interface Gpa {
  id: number;
  course_id: number;
  serial: string;
  course_name: string;
  teacher: string;
  score_range: {
    gpa_name: GpaNames;
    student_amount: number;
    percentage: string;
  }[];
}

export interface CourseMyScheduleApi extends Omit<BaseApi, "data"> {
  data: {
    total_credit: number;
    src_uri: string;
    courses: Course[];
    gpa: Gpa[];
    timeline: Record<
      "M" | "T" | "W" | "R" | "F" | "S" | "U",
      TimelineSession[]
    >;
  };
}
