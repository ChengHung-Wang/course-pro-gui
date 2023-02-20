<template>
  <div class="course-summary">
    <div class="container-fluid component-padding m-0">
      <div class="row">
        <div class="col-12 mt-5 mb-2">
          <h2>總覽</h2>
        </div>
      </div>
    </div>
    <CourseDashboard class="pt-0" />
    <div class="container-fluid component-padding mt-5">
      <div class="row">
        <div class="col-12 fbc">
          <h3 class="m-0">課表預覽</h3>
          <el-link href="#" class="text-primary m-0">在課程規劃中查看</el-link>
        </div>
      </div>
    </div>
    <CourseSchedule />
  </div>
</template>

<script lang="ts">
import CourseDashboard from "@/components/Course/CourseDashboard.vue";
import CourseSchedule from "@/components/Course/CourseSchedule/CourseSchedule.vue";
import { useCourseStore } from "@/store/course";

export default {
  components: {
    CourseDashboard,
    CourseSchedule,
  },
  setup() {
    const courseStore = useCourseStore();
    return {
      courseStore,
    };
  },
  mounted() {
    this.courseStore.menu.active = 0;
  },
};
</script>
