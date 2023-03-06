import type { BaseApi } from "@/models/api";

export interface AccountForgetQuestionsApi extends Omit<BaseApi, "data"> {
  data: {
    id: number;
    question_description: string;
    updated_at: string;
  }[];
}
