import { defineStore } from "pinia";
import router from "@/router";

export const useGlobalStore = defineStore("global", {
  state: () => {
    return {
      loading: false,
      userInfo: {
        name: "",
        avatars: [],
        email: "",
      },
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
  },
});
