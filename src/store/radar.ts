import {defineStore} from "pinia";
import {ref} from "vue";

export const useRadarStore = defineStore('radar', {
    state: () => ({
        menu: ref<MenusConfig>({
            items: [
                {
                    icon: '',
                    displayName: '總覽',
                    click: () => {}
                },
                {
                    icon: '',
                    displayName: '服務列表',
                    click: () => {}
                },
                {
                    icon: '',
                    displayName: '嗅探設定',
                    click: () => {}
                }
            ],
            active: 0
        })
    }),
    actions: {

    }
})