import type { BaseApi } from "@/models/api";

export interface SystemMapTimeRegistrationApi extends Omit<BaseApi, "data"> {
  data: {
    name_zh: string;
    name_en: string;
    path: string;
    start_at: string;
    end_at: string;
  }[];
}
