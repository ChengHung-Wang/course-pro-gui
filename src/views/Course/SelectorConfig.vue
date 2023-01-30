<template>
  <div class="container-fluid component-padding m-0">
    <div class="row">
      <div class="col-12 mt-5">
        <h2>選課設定</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { useCourseStore } from "@/store/course";

export default {
  name: "SelectorConfig",
  setup() {
    const courseStore = useCourseStore();
    return {
      courseStore
    }
  },
  mounted() {
    this.courseStore.menu.active = 4;
  }
}
</script>

<style scoped>

</style>