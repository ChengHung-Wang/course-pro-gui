<template>
  <div id="app-root">
    <div id="app-nav">
      <SideMenu :app-id="0" :menu="courseStore.menu" />
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
import CourseDashboard from "@/components/Course/CourseDashboard.vue";
import CourseSchedule from "@/components/Course/CourseSchedule/CourseSchedule.vue";
import { useCourseStore } from "@/store/course/course";
import { storeToRefs } from "pinia";
import { toRaw } from "vue";

export default {
  setup() {
    const courseStore = useCourseStore();
    const { schedule } = storeToRefs(courseStore);
    return {
      courseStore,
      schedule,
    };
  },
  components: {
    CourseDashboard,
    CourseSchedule,
    SideMenu,
  },
  async created() {
    if (toRaw(this.courseStore.schedule).totalCredit === -1) {
      const data = await this.courseStore.getScheduleSummary();
    }
  },
  methods: {},
  watch: {},
};
</script>

<style>
@import "/src/assets/css/course.css";
</style>
