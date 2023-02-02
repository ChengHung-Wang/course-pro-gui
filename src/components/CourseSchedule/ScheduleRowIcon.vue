<script setup lang="ts">
import { useCourseStore } from "@/store/course";

const courseStore = useCourseStore();
</script>

<template>
  <div
    class="course-schedule-icon"
    v-if="Object.keys(courseStore.schedule.timeline).length > 0"
  >
    <div
      class="icon-container"
      v-for="name in Object.keys(courseStore.schedule.timeline)"
      :key="name"
    >
      <img :src="courseStore.dayIcons[name].toString()" alt="" />
    </div>
  </div>
</template>

<style scoped>
.course-schedule-icon {
  margin-top: calc(75px + 24px);
  width: 60px;
}
.icon-container {
  width: 60px;
  height: calc(92px + 24px);
}
img {
  width: 100%;
  margin-top: -3px;
  object-fit: contain;
}
</style>
