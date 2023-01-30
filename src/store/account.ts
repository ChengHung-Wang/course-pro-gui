import {defineStore} from "pinia";
import { useGlobalStore } from "@/store/global";
import {ElLoading} from "element-plus";
import {ref} from "vue";

export const useAccountStore = defineStore('account', {
    state: () => {
        return {
            userData: ref({
                birthday: ""
            })
        }
    },
    actions: {
        async getAccountInfo() {
            const loading = ElLoading.service();
            useGlobalStore().checkLogin();
            const response = await useGlobalStore().send("/api/v2/account", "GET");
            loading.close();
            if (response.status === 200)
            {
                this.userData = response.res.data;
                console.log(this.userData);
            }
        }
    }
});