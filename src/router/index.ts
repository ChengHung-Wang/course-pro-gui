import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import {useAccountStore} from "@/store/account";
import {useGlobalStore} from "@/store/global";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/course",
    component: () => import("../views/Course/CourseView.vue"),
    children: [
      {
        path: "",
        name: "course-summary",
        component: () => import("../views/Course/Summary.vue"),
      },
      {
        path: "plan",
        component: () => import("../views/Course/Plan.vue"),
      },
      {
        path: "transfer",
        component: () => import("../views/Course/Transfer.vue"),
      },
      {
        path: "history",
        component: () => import("../views/Course/History.vue"),
      },
      {
        path: "setting",
        component: () => import("../views/Course/SelectorConfig.vue"),
      },
      {
        path: "instance",
        component: () => import("../views/Course/SelectorInstance.vue"),
      },
    ],
  },
  {
    path: "/guide",
    name: "courseGuide",
    component: () => import("../views/CourseGuide/CourseGuideView.vue"),
  },
  {
    path: "/radar",
    name: "radar",
    component: () => import("../views/Radar/RadarView.vue"),
  },
  {
    path: "/logs",
    name: "logs",
    component: () => import("../views/Logs/LogsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const isLogin = localStorage.getItem("hasLogin") == "1";
  if (to.fullPath === "/login" || isLogin) return;
  return {
    name: "login"
  }
})

export default router;
