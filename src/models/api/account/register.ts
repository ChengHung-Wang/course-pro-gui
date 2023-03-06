import type { BaseApi } from "@/models/api";
import type { PersonalInfo } from ".";

export interface AccountRegisterApi extends Omit<BaseApi, "data"> {
  data: {
    user: PersonalInfo;
    token: string;
  };
}
