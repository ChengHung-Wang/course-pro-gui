import type { BaseApi } from "@/models/api";

export interface Question {
  id: number;
  question_description: string;
  language_id: number;
  created_at: string;
  updated_at: string;
}

export interface AccountForgetApi extends Omit<BaseApi, "data"> {
  data: {
    id: number;
    user_id: number;
    question_id: number;
    created_at: string | null;
    updated_at: string;
    question: Question;
  }[];
}
