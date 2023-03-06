import type { BaseApi } from "@/models/api";
import type { Question } from ".";

export interface AccountForgetQuestionsApi extends Omit<BaseApi, "data"> {
  data: Pick<Question, "id" | "question_description" | "updated_at">[];
}
