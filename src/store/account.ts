import { defineStore } from "pinia";
import { useGlobalStore } from "@/store/global";
import { ElLoading } from "element-plus";
import { request } from "@/api";
import { useLoginStore } from "@/store/login";

export const useAccountStore = defineStore("account", {
  state: () => {
    return {
      userData: {},
    };
  },
  actions: {
    async getAccountInfo() {
      await useGlobalStore().checkLogin();
      const loading = ElLoading.service();
      const response = await request("GET", "/account");
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
