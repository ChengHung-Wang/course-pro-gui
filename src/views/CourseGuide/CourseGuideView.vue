<template>
  <div id="app-root">
    <div id="app-nav">
      <SideMenu :app-id="1" :menu="CourseGuideStore.menu" />
    </div>
    <div id="app-frame">
      <div class="frame-inner">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SideMenu from "@/components/CourseSchedule/SideMenu.vue";
import { useCourseGuideStore } from "@/store/courseGuide";
export default {
  setup() {
    const CourseGuideStore = useCourseGuideStore();
    return {
      CourseGuideStore,
    };
  },
  components: {
    SideMenu,
  },
};
</script>

<style scoped></style>
