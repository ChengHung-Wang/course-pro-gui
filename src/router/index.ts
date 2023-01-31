import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from "@/views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: "/login",
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/course',
    component: () => import('@/views/Course/CourseView.vue'),
    children: [
      {
        path: '/course',
        name: 'course-summary',
        component: () => import('@/views/Course/Summary.vue')
      },
      {
        path: 'plan',
        component: () => import('@/views/Course/Plan.vue')
      },
      {
        path: 'transfer',
        component: () => import('@/views/Course/Transfer.vue')
      },
      {
        path: 'history',
        component: () => import('@/views/Course/History.vue')
      },
      {
        path: 'setting',
        component: () => import('@/views/Course/SelectorConfig.vue')
      },
      {
        path: 'instance',
        component: () => import('@/views/Course/SelectorInstance.vue')
      }
    ]
  },
  {
    path: '/safari',
    name: 'course-safari',
    component: () => import('@/views/CourseSafari/CourseSafariView.vue')
  },
  {
    path: '/radar',
    name: 'radar',
    component: () => import('@/views/Radar/RadarView.vue')
  },
  {
    path: '/logs',
    name: 'logs',
    component: () => import('@/views/Logs/LogsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
