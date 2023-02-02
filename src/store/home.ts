import { defineStore } from "pinia";
import { ref } from "vue";
import router from "@/router";

export const useHomeStore = defineStore("home", {
  state() {
    return {
      config: ref({}),
      apps: [
        {
          name: "Course",
          displayName: "課程",
          icon: new URL(
            "/src/assets/appIcons/course_table.png",
            import.meta.url
          ),
          click: () => {
            router.push({ name: "course-summary" });
          },
        },
        {
          name: "CourseGuide",
          displayName: "課程指南",
          icon: new URL("/src/assets/appIcons/safari.png", import.meta.url),
          click: () => {
            router.push({ name: "courseGuide" });
          },
        },
        {
          name: "Radar",
          displayName: "嗅探雷達",
          icon: new URL("/src/assets/appIcons/find.png", import.meta.url),
          click: () => {
            router.push({ name: "radar" });
          },
        },
        {
          name: "Logs",
          displayName: "日誌",
          icon: new URL(
            "/src/assets/appIcons/time_machine.png",
            import.meta.url
          ),
          click: () => {
            router.push({ name: "logs" });
          },
        },
        {
          name: "Terminal",
          displayName: "終端",
          icon: new URL("/src/assets/appIcons/terminal.png", import.meta.url),
          click: () => {
            router.push({ name: "terminal" });
          },
        },
        {
          name: "Setting",
          displayName: "系統偏好設置",
          icon: new URL("/src/assets/appIcons/setting.png", import.meta.url),
          click: () => {},
        },
      ],
    };
  },
  getters: {},
  actions: {},
});
