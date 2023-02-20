<template>
  <div class="container-fluid component-padding m-0">
    <div class="row">
      <div class="col-12 mt-5">
        <h2>課程規劃</h2>
      </div>
      <div class="col-12 mt-3">
        <el-input></el-input>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useCourseStore } from "@/store/course";

export default {
  setup() {
    const courseStore = useCourseStore();
    return {
      courseStore,
    };
  },
  mounted() {
    this.courseStore.menu.active = 1;
  },
};
</script>

<style scoped></style>
