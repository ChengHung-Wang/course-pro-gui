import type { Teacher } from "@/models/teacher";
import type { Semester } from "@/models/course/semester";

export interface Course {
  id: number;
  name_zh: string;
  name_en: string;
  description_zh: string;
  description_en: string;
  detail_zh: string | null; // TODO
  detail_en: string | null; // TODO
  serial: string;
  points: number;
  classroom_on: Array<string | null>;
  restrict?: {
    all: number;
    choose_students: number;
    three_students: number;
    first: string;
    second: string;
    ntu: string;
    ntnu: string;
  };
  hold_on: string[];
  original?: never;
  semester_id?: number;
  dimension_id?: null;
  teacher_id?: number;
  created_at?: string;
  updated_at?: string;
  teacher?: Teacher;
  semester: Semester;
  dimision: {
    id: number;
    no: string;
    description_zh_tw: string;
    description_en_us: string;
  } | null;
}
