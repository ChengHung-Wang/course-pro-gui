import { defineStore } from "pinia";
import router from "@/router";
import { ElLoading } from "element-plus";

export const useGlobalStore = defineStore("global", {
  state: () => {
    return {
      loadingAnimate: <any>undefined,
      loading: false,
      userInfo: {
        name: "",
        avatars: [],
        email: "",
      },
      radarStart: false,
    };
  },
  actions: {
    async checkLogin() {
      if (localStorage.getItem("hasLogin") != "1") {
        this.clearAccessSession();
        await router.push({ name: "login" });
      }
    },
    clearAccessSession() {
      localStorage.removeItem("token");
      localStorage.removeItem("hasLogin");
    },
    enableLoading(option = {}) {
      this.loadingAnimate = ElLoading.service(option);
    },
    disableLoading() {
      if (this.loadingAnimate != undefined) {
        this.loadingAnimate.close();
        this.loadingAnimate = undefined;
      }
    },
  },
});
