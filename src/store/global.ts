import { defineStore } from 'pinia'
// import axios from 'axios';

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useGlobalStore = defineStore('global', {
    state: () => {
        return {
            api_base: "http://10.71.74.87:8000"
        }
    },
    getters: {
        hasLogin: ():null | boolean => localStorage.getItem("hasLogin") == "1",
        token: (): null | string => localStorage.getItem("token")
    },
    // other options...
    actions: {
        async send(path:string, method:string = "GET", body:object = {})
        {
            const uri:string = this.api_base + path;
            let headers:any = {
                "Content-Type": "application/json",
                "Accept": "application/json",
            };
            if (this.hasLogin && this.token != null) {
                headers["Authorization"] = this.token;
            }
            const res = await fetch(uri, {
                method: method,
                headers: headers,
                body: JSON.stringify(body)
            });
            return await res.json();
        }
    }
})