import { defineStore } from 'pinia';
import { useGlobalStore } from "@/store/global";
export const useLoginStore = defineStore('login', {
    state: () => {
        return {
            blabla: "1234"
        };
    },
    actions: {
        // apis
        login: async (account, password) => {
            const globalStore = useGlobalStore();
            console.log(globalStore.token);
            const data = await globalStore.send("/api/v2/account/login", "POST", {
                email: account,
                password: password
            });
            if (data.success === true) {
                localStorage.setItem("hasLogin", "1");
                localStorage.setItem("token", data.data.access_token);
            }
            return data.success === true;
        }
    }
});
//# sourceMappingURL=login.js.map