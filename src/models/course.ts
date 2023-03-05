import type { Teacher } from "@/models/teacher";

export interface Course {
  id: number;
  name_zh: string;
  name_en: string;
  description_zh: string;
  description_en: string;
  detail_zh?: any;
  detail_en?: any;
  serial: string;
  points: string;
  classroom_on: never[];
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
}
