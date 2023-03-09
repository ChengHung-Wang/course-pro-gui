import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import { omit } from "lodash";
import { useAccountStore } from "@/store/account";
import { useGlobalStore } from "@/store/global";
import router from "@/router";
import { request } from "@/api";
import type { AccountForgetQuestionsApi } from "@/models/api/account/forget/questions";
import type { SystemMapLanguagesApi } from "@/models/api/system/map/languages";
import type { AccountForgetApi } from "@/models/api/account/forget";
import type { AccountAvatarApi } from "@/models/api/account/avatar";
import type { AccountLoginApi } from "@/models/api/account/login";
import type { AccountRegisterApi } from "@/models/api/account/register";

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
    questions: [] as AccountForgetQuestionsApi["data"], // TODO make this default to null
    answer: [] as string[],

    // loading: ElLoading
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
    async login(account: string, password: string) {
      const data = await request<AccountLoginApi>("POST", "/account/login", {
        email: account,
        password: password,
      });
      if (!data.res.success) return;

      localStorage.setItem("hasLogin", "1");
      localStorage.setItem("token", data.res.access_token);
    },

    async register() {
      const globalStore = useGlobalStore();
      globalStore.enableLoading({
        lock: true,
        text: "正在驗證您的身份，這可能會花上30秒甚至更久的時間。",
      });

      // The request body is this.fields.register
      // without the accept and re_password properties
      const registerResponse = await request<AccountRegisterApi>(
        "PUT",
        "/account/register",
        omit(this.fields.register, ["accept", "re_password"])
      );

      globalStore.disableLoading();
      return registerResponse;
    },

    async logout() {
      const globalStore = useGlobalStore();
      globalStore.enableLoading();
      await request("DELETE", "/account/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("hasLogin");
      globalStore.disableLoading();
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
      // this.registerSteps.now = 4;
      if (this.registerSteps.now == 1) {
        // TODO handle error message
        const fields = this.fields.register;
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
      } else if (this.registerSteps.now == 4) {
        if (this.canMoveOn()) {
          this.returnSecurityAnswer();
          this.registerSteps.now++;
        } else
          ElMessage({
            showClose: true,
            message: "填寫不完全",
            type: "error",
          });
      } else if (this.registerSteps.now < this.registerSteps.items.length) {
        this.registerSteps.now++;
      }
    },

    async getSecurityQuestion() {
      const globalStore = useGlobalStore();
      globalStore.enableLoading();
      const languagesRequest = await request<SystemMapLanguagesApi>(
        "GET",
        "/system/map/languages"
      );
      if (languagesRequest.status != 200) return false;
      // TODO: Depends on Header, [0] for instead
      const langCode = languagesRequest.res.data[0].name;

      const questionsRequest = await request<AccountForgetQuestionsApi>(
        "GET",
        "/account/forget/questions/" + langCode
      );
      globalStore.disableLoading();
      if (questionsRequest.status != 200) return false;
      this.questions = questionsRequest.res.data;
    },

    canMoveOn() {
      for (const question of this.questions)
        if (!("reply" in question)) return false;
      return true;
    },

    async returnSecurityAnswer() {
      const arr = [];

      for (const question of this.questions) {
        arr.push({
          question_id: question.id,
          content: question.reply,
        });
      }

      await request<AccountForgetApi>("PUT", "/account/forget", {
        data: arr,
      });
    },

    async uploadAvatar(e: any) {
      const globalStore = useGlobalStore();
      globalStore.enableLoading();

      const fileData = e.target.files[0];
      const form = new FormData();
      form.append("file", fileData);

      await request<AccountAvatarApi>("POST", "/account/avatar", form);
    },

    async uploadComplete(event: any) {
      const data = JSON.parse(event.target.responseText);
      const accountStore = useAccountStore();
      const globalStore = useGlobalStore();
      if (!accountStore.userData) return;
      accountStore.userData.avatars = [];
      accountStore.userData.avatars.push(data.data);
      globalStore.disableLoading();
    },

    register_back: () => {},
  },
});
