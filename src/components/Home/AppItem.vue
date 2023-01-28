<template>
  <div class="home-app-item">
    <img :src="require('/src/assets/appIcons/course_table.png')" alt="">
    <p>課程</p>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "App"
})
</script>

<style scoped>
  .home-app-item {

  }
</style>