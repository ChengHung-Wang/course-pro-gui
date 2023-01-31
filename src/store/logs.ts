import {defineStore} from "pinia";
import {ref} from "vue";

export const useLogsStore = defineStore('logs', {
    state: () => ({
        menu: ref<MenusConfig>({
            items: [

            ],
            active: 0
        })
    }),
    actions: {

    }
})