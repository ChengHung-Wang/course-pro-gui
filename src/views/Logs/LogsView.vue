<template>
  <div id="app-root">
    <div id="app-nav">
      <Menu :app-id="3" :menu="logsStore.menu" />
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
import { useLogsStore } from "@/store/logs";

export default {
  setup() {
    const logsStore = useLogsStore();
    return {
      logsStore,
    };
  },
  components: {
    Menu,
  },
};
</script>

<style scoped></style>
