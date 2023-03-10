import { defineStore } from "pinia";
import { ElLoading } from "element-plus";
import { pick } from "lodash";
import { useGlobalStore } from "@/store/global";
import { useLoginStore } from "@/store/login";
import { request } from "@/api";
import type { AccountApi, PersonalInfo } from "@/models/api/account";

interface State {
  userData:
    | (PersonalInfo & Pick<AccountApi["data"], "avatars" | "student_no">)
    | null;
}

export const useAccountStore = defineStore("account", {
  state: (): State => {
    return {
      userData: null,
    };
  },
  actions: {
    async getAccountInfo() {
      await useGlobalStore().checkLogin();
      const loading = ElLoading.service();
      const response = await request<AccountApi>("GET", "/account");
      loading.close();

      if (response.status === 200) {
        const responseData = response.res.data;
        this.userData = {
          ...responseData.personal_info,
          ...pick(responseData, ["avatars", "student_no"]),
        };
      }
      if (response.status === 401) {
        useLoginStore().logout();
      }
    },
  },
});
