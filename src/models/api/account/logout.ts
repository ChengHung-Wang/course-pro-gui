import type { BaseApi } from "@/models/api";

export interface AccountLogoutApi extends Omit<BaseApi, "data"> {
  data: never[];
}
