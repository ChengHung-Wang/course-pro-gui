<template>
  <div id="app-root">
    <div id="app-nav">
      <SideMenu :app-id="3" :menu="logsStore.menu" />
    </div>
    <div id="app-frame">
      <div class="frame-inner">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SideMenu from "@/components/Course/SideMenu.vue";
import { useLogsStore } from "@/store/logs";

export default {
  setup() {
    const logsStore = useLogsStore();
    return {
      logsStore,
    };
  },
  components: {
    SideMenu,
  },
};
</script>

<style scoped></style>
