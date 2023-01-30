import {defineStore} from 'pinia'
import {ref} from "vue";
import router from "@/router";
import {useLoginStore} from "@/store/login";
// import axios from 'axios';

export const useGlobalStore = defineStore('global', {
    state: () => {
        return {
            api_base: "http://10.71.74.4:8000",
            loading: ref(false),
            userInfo: ref({
                name: "",
                avatars: [],
                email: ""
            })
        }
    },
    getters: {

    },
    actions: {
        async send(path: string, method: string = "GET", body: object = {}, location: boolean = false): Promise<ApiResponse> {
            const uri: string = this.api_base + path;
            let headers: any = {
                "Content-Type": "application/json",
                "Accept": "application/json",
            };
            if (localStorage.getItem("hasLogin") == "1" && localStorage.getItem("token") != null) {
                headers.Authorization = "Bearer " + localStorage.getItem("token");
            }
            let option: any = {
                method: method,
                headers: headers,
            }
            if (method !== "GET" && method !== "HEAD") {
                option.body = JSON.stringify(body)
            }
            const data = await fetch(uri, option);
            if (location && data.status !== 200) {
                const loginStore = useLoginStore();
                loginStore.logout();
            }
            return {
                status: data.status,
                res: await data.json()
            };
        },
        checkLogin() {
            if (localStorage.getItem("hasLogin") != "1") {
                router.push({
                    name: "login"
                }).then(() => {
                    this.clearAccessSession();
                })
            }
        },
        clearAccessSession() {
            localStorage.removeItem("token");
            localStorage.removeItem("hasLogin");
        }
    }
})