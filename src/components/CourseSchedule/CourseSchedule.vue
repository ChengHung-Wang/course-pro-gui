<template>
  <div id="CourseSchedule">
    <div class="row">
      <Column v-for="data in 13" />
    </div>
    <div class="row" v-for="data in 7">
      <Card v-for="data in 13" />
    </div>
  </div>
</template>

<script>
import Card from "@/components/CourseSchedule/Card";
import Column from "@/components/CourseSchedule/Column";
export default {
  name: "CourseSchedule",
  data() {
    return {

    }
  },
  components: {
    Card,
    Column
  }
}
</script>

<style scoped>
  #CourseSchedule {
    position: relative;
    right: 0;
    width: 100%;
  }
  #CourseSchedule> .row {
    display: flex;
    justify-content: space-between;
    margin: 12px 0;
  }
</style>