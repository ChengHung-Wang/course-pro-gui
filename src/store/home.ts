import {defineStore} from "pinia";
import {ref} from "vue";
import router from "@/router";

export const  useHomeStore = defineStore('home', {
    state() {
        return {
            config: ref({

            }),
            apps: [
                {
                    name: "Course",
                    displayName: "課程",
                    icon: require("/src/assets/appIcons/course_table.png"),
                    click: () => { router.push({name: 'course-summary'})}
                },
                {
                    name: "CourseSafari",
                    displayName: "課程指南",
                    icon: require("/src/assets/appIcons/safari.png"),
                    click: () => { router.push({name: 'course-safari'})}
                },
                {
                    name: "Radar",
                    displayName: "嗅探雷達",
                    icon: require("/src/assets/appIcons/find.png"),
                    click: () => { router.push({name: 'radar'})}
                },
                {
                    name: "Logs",
                    displayName: "日誌",
                    icon: require("/src/assets/appIcons/time_machine.png"),
                    click: () => { router.push({name: 'logs'})}
                },
                {
                    name: "Terminal",
                    displayName: "終端",
                    icon: require("/src/assets/appIcons/terminal.png"),
                    click: () => { router.push({name: 'terminal'})}
                },
                {
                    name: "Setting",
                    displayName: "系統偏好設置",
                    icon: require("/src/assets/appIcons/setting.png"),
                    click: () => { }
                }
            ]
        }
    },
    getters: {

    },
    actions: {

    }
});