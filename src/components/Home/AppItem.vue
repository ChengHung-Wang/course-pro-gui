<template>
  <div class="home-app-item fcc">
    <img :src="icon" alt="" />
    <p>{{ appName }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppItem",
  props: {
    icon: String,
    appName: String,
  },
});
</script>

<style></style>
