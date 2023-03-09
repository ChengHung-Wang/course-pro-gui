import type { BaseApi, GpaNames } from "@/models/api";

export interface SystemMapScoreApi extends Omit<BaseApi, "data"> {
  data: {
    map_score: Record<string, string>;
    map_gpa: Record<GpaNames, number>;
  };
}
