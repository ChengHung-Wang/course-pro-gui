<template>
  <div class="container-fluid component-padding m-0">
    <div class="row">
      <div class="col-12 mt-5">
        <h2>課程轉讓</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useCourseStore } from "@/store/course";

export default {
  name: "Transfer",
  setup() {
    const courseStore = useCourseStore();
    return {
      courseStore,
    };
  },
  mounted() {
    this.courseStore.menu.active = 2;
  },
};
</script>

<style scoped></style>
