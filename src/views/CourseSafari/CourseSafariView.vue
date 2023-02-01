<template>
  <div id="app-root">
    <div id="app-nav">
      <Menu :app-id="1" :menu="courseSafariStore.menu" />
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
import { useCourseSafariStore } from "@/store/courseSafari";
export default {
  name: "CourseSafariView",
  setup() {
    const courseSafariStore = useCourseSafariStore();
    return {
      courseSafariStore,
    };
  },
  components: {
    Menu,
  },
};
</script>

<style scoped></style>
