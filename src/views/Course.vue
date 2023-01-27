<template>
  <div id="app-nav">
  </div>
  <div id="app-frame">
    <div class="frame-inner">
      <CourseSchedule/>
    </div>
  </div>
</template>

<script>
import CourseSchedule from "@/components/CourseSchedule/CourseSchedule";
export default {
  name: "Course",
  components: {
    CourseSchedule
  }
}
</script>

<style scoped>
  #app-nav {
    position: fixed;
    left: 0;
    width: 300px;
    height: 100vh;
    background: #eee;
  }
  #app-frame {
    position: relative;
    width: 100%;
    background: orange;
  }
  #app-frame> .frame-inner {
    width: calc(100% - 300px);
    left: 300px;
    position: absolute;
    overflow: auto;
  }
</style>