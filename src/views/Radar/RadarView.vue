<template>
  <div id="app-root">
    <div id="app-nav">
      <Menu :app-id="2" :menu="radarStore.menu" />
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
import { useRadarStore } from "@/store/radar";

export default {
  setup() {
    const radarStore = useRadarStore();
    return {
      radarStore,
    };
  },
  components: {
    Menu,
  },
};
</script>

<style scoped></style>
