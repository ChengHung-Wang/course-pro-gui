<template>
  <!--  <nav>-->
  <!--    <router-link to="/">Home</router-link> |-->
  <!--    <router-link to="/about">About</router-link>-->
  <!--  </nav>-->
  <!--  <CourseSchedule></CourseSchedule>-->
  <router-view />
</template>

<style>
body {
  padding: 0;
  margin: 0;
}
</style>

<script lang="ts">
import { useLoginStore } from "@/store/login";
import device from "current-device";

export default {
  setup() {
    const loginStore = useLoginStore();
    return {
      loginStore,
    };
  },
  mounted() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    if (device.desktop() && !device.ios()) {
      window.addEventListener("resize", () => {
        const new_vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${new_vh}px`);
      });
    }
  },
};
</script>
