<template>
  <div class="container-fluid component-padding m-0">
    <div class="row">
      <div class="col-12 mt-5">
        <h2>搶課服務器</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { useCourseStore } from "@/store/course";

export default {
  name: "SelectorInstance",
  setup() {
    const courseStore = useCourseStore();
    return {
      courseStore
    }
  },
  mounted() {
    this.courseStore.menu.active = 5;
  }
}
</script>

<style scoped>

</style>