import type { BaseApi } from "@/models/api";

export interface AccountAvatarApi extends Omit<BaseApi, "data"> {
  data: {
    avatar: string;
    avatar_hd: string;
  };
}
