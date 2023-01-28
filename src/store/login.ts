import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from "@/router";
import { useGlobalStore } from "@/store/global";
import { ElLoading } from 'element-plus'

export const useLoginStore = defineStore('login', {
    state: () => {
        return {
            displayStatus: ref({
                register: false,
                forget: false,
                login: true
            }),
            fields: ref({
                login: {
                    account: "",
                    password: ""
                },
                register: {
                    accept: false,
                    email: "",
                    password: "",
                    re_password: "",
                    student_no: "",
                    ntust_email_password: "",
                    ntust_sso_password: ""
                },
                forget: {
                    // TODO
                }
            }),
            registerSteps: ref({
                items: ["使用條款", "基本註冊資訊", "課程規劃", "完善個人信息", "帳戶安全", "系統偏好設置", "完成"],
                now: 0
            })
        }
    },
    actions: {
        // -----------------------------
        // ------------ API ------------
        // -----------------------------
        login: async (account:string, password:string) =>
        {
            const globalStore = useGlobalStore();
            const data = await globalStore.send("/api/v2/account/login", "POST", {
                email: account,
                password: password
            });
            if (data.success === true) {
                localStorage.setItem("hasLogin", "1");
                localStorage.setItem("token", data.data.access_token);
            }
            return data.success === true;
        },
        register: async () => {
            // TODO
            return new Promise(function (resolve) {
                const loading = ElLoading.service({
                    lock: true,
                    text: "正在驗證您的身份，這可能會花上30秒甚至更久的時間。",
                })
                setTimeout(() => {
                    loading.close();
                    resolve(true);
                }, 3000)
            })
        },
        async logout() {
            const loading = ElLoading.service();
            setTimeout(() => {
                loading.close();
                console.log(router.push("/login"));
            }, 2000)
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
                ntust_sso_password: ""
            };
            this.displayStatus.register = false;
        },
        async register_next() {
            if (this.registerSteps.now == 1) {
                const loginResult = await this.register();
                // TODO handle error message
                this.registerSteps.now ++;
            }else if (this.registerSteps.now < this.registerSteps.items.length){
                this.registerSteps.now++;
            }
        },
        register_back: () => {

        }
    }
})