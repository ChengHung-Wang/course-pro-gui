<template>
  <div id="app-root">
    <div id="app-nav">
      <SideMenu :app-id="2" :menu="radarStore.menu" />
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
import { useRadarStore } from "@/store/radar";

export default {
  setup() {
    const radarStore = useRadarStore();
    return {
      radarStore,
    };
  },
  components: {
    SideMenu,
  },
};
</script>

<style scoped></style>
