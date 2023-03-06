import type { BaseApi } from "@/models/api";

export interface AccountLoginApi extends Omit<BaseApi, "data"> {
  access_token: string;
}
