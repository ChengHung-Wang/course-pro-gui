import { defineStore } from "pinia";
import { ref } from "vue";
import router from "@/router";

export const useGlobalStore = defineStore("global", {
  state: () => {
    return {
      loading: ref(false),
      userInfo: ref({
        name: "",
        avatars: [],
        email: "",
      }),
    };
  },
  actions: {
    async checkLogin() {
      if (localStorage.getItem("hasLogin") != "1") {
        await router.push({ name: "login" });
        this.clearAccessSession();
      }
    },
    clearAccessSession() {
      localStorage.removeItem("token");
      localStorage.removeItem("hasLogin");
    },
  },
});
