import { defineStore } from 'pinia'
// import axios from 'axios';

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