import { defineStore } from "pinia";
import { toRaw } from "vue";
import { ElLoading, ElMessage } from "element-plus";
import { request } from "@/api";
import { useAccountStore } from "@/store/account";
import router from "@/router";

export const useLoginStore = defineStore("login", {
  state: () => ({
    displayStatus: {
      register: false,
      forget: false,
      login: true,
    },
    fields: {
      login: {
        account: "",
        password: "",
      },
      register: {
        accept: false,
        email: "",
        password: "",
        re_password: "",
        student_no: "",
        ntust_email_password: "",
        ntust_sso_password: "",
      },
      forget: {
        // TODO
      },
    },
    registerSteps: {
      items: [
        "使用條款",
        "基本註冊資訊",
        "課程規劃",
        "完善個人信息",
        "帳戶安全",
        "系統偏好設置",
        "完成",
      ],
      now: 0,
    },
  }),
  getters: {
    registerFormRule() {
      return {
        email: {
          required: true,
          message: "請輸入您常用的 email",
          trigger: "blur",
        },
        password: { required: true, message: "請輸入密碼", trigger: "change" },
        re_password: {
          required: true,
          message: "密碼不一致",
          validator: true,
          trigger: "change",
        },
        student_no: {
          required: true,
          message: "請輸入學號",
          trigger: "change",
        },
        ntust_email_password: {
          required: true,
          message: "請輸入台科電子信箱密碼",
          trigger: "change",
        },
        ntust_sso_password: {
          required: true,
          message: "請輸入您登入台科校務系統的密碼",
          trigger: "change",
        },
      };
    },
  },
  actions: {
    // -----------------------------
    // ------------ API ------------
    // -----------------------------
    login: async (account: string, password: string) => {
      const data = await request("POST", "/account/login", {
        email: account,
        password: password,
      });
      const res = await data.res;
      if ((await res.success) === true) {
        localStorage.setItem("hasLogin", "1");
        localStorage.setItem("token", await res.data.access_token);
      }
      return (await res.success) === true;
    },
    async register() {
      const loading = ElLoading.service({
        lock: true,
        text: "正在驗證您的身份，這可能會花上30秒甚至更久的時間。",
      });
      const registerResponse = await request("PUT", "/account/register", {
        email: this.fields.register.email,
        password: this.fields.register.password,
        student_no: this.fields.register.student_no,
        ntust_email_password: this.fields.register.ntust_email_password,
        ntust_sso_password: this.fields.register.ntust_sso_password,
      });
      loading.close();
      return registerResponse;
    },
    async logout() {
      const loading = ElLoading.service();
      await request("DELETE", "/account/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("hasLogin");
      loading.close();
      setTimeout(async () => {
        await router.push("/login");
      }, 250);
    },
    // -----------------------------
    // ---------- feature ----------
    // -----------------------------
    register_cancel() {
      this.fields.register = {
        accept: false,
        email: "",
        password: "",
        re_password: "",
        student_no: "",
        ntust_email_password: "",
        ntust_sso_password: "",
      };
      this.displayStatus.register = false;
    },
    async register_next() {

      if (this.registerSteps.now == 1) {
        // TODO handle error message
        const fields = toRaw(this.fields).register;
        if (fields.password !== fields.re_password && fields.password !== "") {
          ElMessage({
            showClose: true,
            message: "密碼不一致",
            type: "warning",
          });
        } else {
          const registerResponse = await this.register();
          if (registerResponse.status === 200) {
            this.registerSteps.now++;
            const accountStore = useAccountStore();
            registerResponse.res.data.user.avatars = [];
            accountStore.userData = registerResponse.res.data.user;
            // console.log(registerResponse.res.data.user);
            localStorage.setItem("hasLogin", "1");
            // localStorage.setItem("token", registerResponse.res.data.token);
            localStorage.setItem("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjJiNmM2OThiMmI0ODVlZmM5ZjhlZGFjNjI5OTM1MWNlZmQ1MDU4ZDdlNWIxZWEwMzI5ZmI4ZDEwYTQ0ZDc2NDI1MTIyNjZkNzk1NjcyZTIiLCJpYXQiOjE2NzY1NzcwNTguNDE5OTUsIm5iZiI6MTY3NjU3NzA1OC40MTk5NTMsImV4cCI6MTcwODExMzA1OC4zNzIyODQsInN1YiI6IjE4Iiwic2NvcGVzIjpbXX0.Qic1CEd3TC2cDpyScurL1x5f-Nvps3tJlJNmQayhVn8vDobFFHelxW81LF9hVJp_MFfRXbHvPNprnfNwUUbhh6rDY49ysYmWf_ePcBCGb-E59SfVn8VqfobpTOxx2QSuuRiPbto7SzKw8CQCaU_1HG6WcfVMuXiTQeOgWt2jl0UDbhooDk-UkdKSalEHLaVTly9AdKMRWD7dK1IcWDgm11UQzXRyTXV5JXckdnbkEeOiuGC-L8vfZW7dmGInEZzMv95d5cbx5_181ng8jZvRcm_pNAu966yrNZy_5jdToW8xdSl4HBaQZEJPPUXct9ksAto0s8RlOtXklrXCUer-S6fgR92MVU15yl742SfK8kmmy9qZoYC31pcYIrJR7RM-kDdB0i_ynwPOx9J3bT3yadEyxE-kkxQRcm-a1qh9mqGgyJ1HuSAg6Js83ySj2ubUEBiJVR48KNuMZJI4knebupz3QNPrCQH65XHFJWPZkq1SjJKlR-Nb2ivBgIIOUCDoEImAK_Gqzp5bf0gm6TvYN5Rp6ZzRtnTBDzjP_9-9XpBrhm9w-OXq0g3aL_vwPaiFdxtS5ovOWZAjjcoWccNuxsilyXjQ9EoSjiW49wm0OAmJmr0AM_Cld1OI48qTxGo1IjNUUb1CbhJVkXhqHVqlcyc0ESyS7vWjb4m42TG5S5w");
          } else {
            ElMessage({
              showClose: true,
              message: registerResponse.res.data.reason,
              type: "error",
            });
          }
        }
      } else if (this.registerSteps.now < this.registerSteps.items.length) {
        this.registerSteps.now++;
      }
    },
    register_back: () => {},
  },
});
