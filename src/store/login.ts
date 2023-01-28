import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useGlobalStore } from "@/store/global";

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
                    student_no: "",
                    ntust_email_password: "",
                    ntust_sso_password: ""
                },
                forget: {
                    // TODO
                }
            }),
            registerSteps: ref({
                items: ["使用條款", "基本註冊資訊", "課程規劃", "完善個人信息", "系統偏好設置", "完成"],
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

        },
        // -----------------------------
        // ---------- feature ----------
        // -----------------------------
        register_cancel: () => {

        },
        register_next: () => {

        },
        register_back: () => {

        }
    }
})