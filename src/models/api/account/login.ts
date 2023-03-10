import type { BaseApi } from "@/models/api";

export interface AccountLoginApi extends Omit<BaseApi, "data"> {
  data: {
    access_token: string;
  };
}
