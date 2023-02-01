<template>
  <div class="home-app-item fcc">
    <img :src="icon.toString()" alt="" />
    <p>{{ appName }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icon: { type: URL, required: true },
    appName: String,
  },
});
</script>

<style></style>
