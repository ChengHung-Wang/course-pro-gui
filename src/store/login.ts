import { defineStore } from "pinia";
import { ref, toRaw } from "vue";
import { useGlobalStore } from "@/store/global";
import { useAccountStore } from "@/store/account";
import { ElLoading, ElMessage } from "element-plus";

export const useLoginStore = defineStore("login", {
  state: () => ({
    displayStatus: ref({
      register: false,
      forget: false,
      login: true,
    }),
    fields: ref({
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
    }),
    registerSteps: ref({
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
    }),
  }),
  getters: {
    registerFormRule(state) {
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
      const globalStore = useGlobalStore();
      let data = await globalStore.send("/api/v2/account/login", "POST", {
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
      return new Promise<ApiResponse>(async (resolve) => {
        const loading = ElLoading.service({
          lock: true,
          text: "正在驗證您的身份，這可能會花上30秒甚至更久的時間。",
        });
        const registerResponse = await useGlobalStore().send(
          "/api/v2/account/register",
          "PUT",
          {
            email: this.fields.register.email,
            password: this.fields.register.password,
            student_no: this.fields.register.student_no,
            ntust_email_password: this.fields.register.ntust_email_password,
            ntust_sso_password: this.fields.register.ntust_sso_password,
          }
        );
        loading.close();
        resolve(registerResponse);
      });
    },
    async logout() {
      const loading = ElLoading.service();
      await useGlobalStore().send("/api/v2/account/logout", "DELETE");
      localStorage.removeItem("token");
      localStorage.removeItem("hasLogin");
      loading.close();
      window.location.href = "/login";
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
            localStorage.setItem("hasLogin", "1");
            localStorage.setItem("token", registerResponse.res.data.token);
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
