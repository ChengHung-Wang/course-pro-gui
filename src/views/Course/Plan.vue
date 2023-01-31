<template>
  <div class="container-fluid component-padding m-0">
    <div class="row">
      <div class="col-12 mt-5">
        <h2>課程規劃</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useCourseStore } from "@/store/course";

export default {
  name: "Plan",
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
