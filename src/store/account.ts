import { defineStore } from "pinia";
import { useGlobalStore } from "@/store/global";
import { ElLoading } from "element-plus";
import { request } from "@/api";
import { useLoginStore } from "@/store/login";
import type { AccountApi } from "@/models/api/account";

interface State {
  userData: AccountApi["data"] | null;
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
        this.userData = response.res.data;
      }
      if (response.status === 401) {
        useLoginStore().logout();
      }
    },
    // TODO: @An-Yang 上傳頭貼
    async uploadAvatar() {},
  },
});
