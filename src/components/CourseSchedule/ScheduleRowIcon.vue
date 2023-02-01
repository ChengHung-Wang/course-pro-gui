<template>
  <div
    class="course-schedule-icon"
    v-if="Object.keys(schedule.timeline).length > 0"
  >
    <div class="icon-container" v-for="name in Object.keys(schedule.timeline)">
      <img :src="courseStore.dayIcons[name]" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCourseStore } from "@/store/course";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "ScheduleRowIcon",
  setup() {
    const courseStore = useCourseStore();
    const { schedule } = storeToRefs(useCourseStore());
    return {
      courseStore,
      schedule,
    };
  },
});
</script>

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
