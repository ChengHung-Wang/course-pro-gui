<template>
  <div id="app-root">
    <div id="app-nav">
      <Menu :app-id="1" :menu="CourseGuideStore.menu" />
    </div>
    <div id="app-frame">
      <div class="frame-inner">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Menu from "@/components/CourseSchedule/Menu.vue";
import { useCourseGuideStore } from "@/store/courseGuide";
export default {
  name: "CourseGuideView",
  setup() {
    const CourseGuideStore = useCourseGuideStore();
    return {
      CourseGuideStore,
    };
  },
  components: {
    Menu,
  },
};
</script>

<style scoped></style>
