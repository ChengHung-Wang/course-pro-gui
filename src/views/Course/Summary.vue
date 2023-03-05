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
      <div class="row mb-4">
        <div class="col-12 mb-2 fbc">
          <div class="fsc mb-2">
            <img width="36" style="margin-right: 6px;" src="/src/assets/icons/icons8-warning_shield.svg" alt="">
            <h3 class="m-0">請謹慎考慮這些課</h3>
            <el-tooltip
                class="box-item"
                effect="dark"
                content="根據糞課雷達自動生成"
                placement="top">
              <el-icon color="#E6A23C" style="margin-left: 6px;">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </div>
        <div class="col-3" v-for="item in 4">
          <el-skeleton :animated="true">
            <template #template>
              <el-skeleton-item style="height: 180px;" variant="p" />
            </template>
          </el-skeleton>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-12 mb-2 fbc">
          <div class="fsc mb-2">
            <img width="36" style="margin-right: 6px;" src="/src/assets/icons/icons8-facebook_like.svg" alt="">
            <h3 class="m-0">換位老師，也許會更好</h3>
            <el-tooltip
                class="box-item"
                effect="dark"
                content="根據糞課雷達自動生成"
                placement="top"
            >
              <el-icon color="#E6A23C" style="margin-left: 6px;">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </div>
        <div class="col-3" v-for="item in 2">
          <el-skeleton :animated="true">
            <template #template>
              <el-skeleton-item style="height: 180px;" variant="p" />
            </template>
          </el-skeleton>
        </div>
      </div>
      <div class="row">
        <div class="col-12 fbc">
          <div class="fsc mb-2">
            <img width="36" style="margin-right: 6px;" src="/src/assets/icons/icons8-schedule.svg" alt="">
            <h3 class="m-0">課表預覽</h3>
          </div>
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
import { useCourseStore } from "@/store/course/course";

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
