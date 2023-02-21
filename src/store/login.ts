import { defineStore } from "pinia";
import { toRaw } from "vue";
import { ElLoading, ElMessage } from "element-plus";
import { request } from "@/api";
import { useAccountStore } from "@/store/account";
import { useGlobalStore } from "@/store/global";
import type { Question } from "@/models/identity";
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
        questions: Array<Question>(),
        answer: Array<String>(),

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
                password: {required: true, message: "請輸入密碼", trigger: "change"},
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
            let globalStore = useGlobalStore();
            globalStore.enableLoading({
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
            globalStore.disableLoading();
            return registerResponse;
        },
        async logout() {
            let globalStore = useGlobalStore();
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
                    this.returnSecutiryAnswer();
                    this.registerSteps.now++;
                } else ElMessage({
                    showClose: true,
                    message: "填寫不完全",
                    type: "error"
                })
            } else if (this.registerSteps.now < this.registerSteps.items.length) {
                this.registerSteps.now++;
            }

        },

        async getSecurityQuestion() {
            let globalStore = useGlobalStore();
            globalStore.enableLoading();
            let result = await request("GET", "/system/map/languages");
            if (result.status != 200) return false;

            // TODO: Depends on Header, [0] for instead
            const langCode = result.res.data[0].name;
            result = await request("GET", "/account/forget/questions/" + langCode);
            globalStore.disableLoading();
            if (result.status != 200) return false;
            this.questions = result.res.data;
        },

        canMoveOn() {
            for (let question of this.questions) if (question.reply == undefined) return false;
            return true;
        },

        async returnSecutiryAnswer() {
            let arr = [];

            for (let question of this.questions) {
                arr.push({
                    "question_id": question.id,
                    "content": question.reply,
                });
            }

            const result = await request("PUT", "/account/forget", {
                "data": arr
            });

        },

        async uploadAvatar(e: any) {
            const endpoint = import.meta.env.VITE_API_END_POINT;
            const baseURI = endpoint + import.meta.env.VITE_API_BASE_URL;

            let globalStore = useGlobalStore();
            globalStore.enableLoading();
            let fileData = e.target.files[0];
            let url = baseURI + "/account/avatar";
            let xhr = new XMLHttpRequest();
            let form = new FormData();
            form.append("file", fileData);

            xhr.onload = this.uploadComplete;
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
            xhr.send(form);
        },

        async uploadComplete(event: any) {
            let data = JSON.parse(event.target.responseText);
            let accountStore = useAccountStore();
            let globalStore = useGlobalStore();
            accountStore.userData.avatars = [];
            accountStore.userData.avatars.push(data.data);
            globalStore.disableLoading();
        },

        register_back: () => {
        },
    },
});
