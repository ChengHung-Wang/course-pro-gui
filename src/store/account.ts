import { defineStore } from "pinia";
import { useGlobalStore } from "@/store/global";
import { ElLoading } from "element-plus";
import { request } from "@/api";

export const useAccountStore = defineStore("account", {
  state: () => {
    return {
      userData: {},
    };
  },
  actions: {
    async getAccountInfo() {
      const globalStore = useGlobalStore();
      const loading = ElLoading.service();
      globalStore.checkLogin();
      const response = await request("GET", "/account");
      loading.close();
      if (response.status === 200) {
        this.userData = response.res.data;
      }
      if (response.status === 401) {
        globalStore.clearAccessSession();
        window.location.reload();
      }
    },
    async uploadAvatar() {},
  },
});
