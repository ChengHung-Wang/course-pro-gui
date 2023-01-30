<template>
  <div id="app-root">
    <div id="app-nav">
      <Menu></Menu>
    </div>
    <div id="app-frame">
      <div class="frame-inner">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/CourseSchedule/Menu";
import CourseDashboard from "@/components/CourseSchedule/CourseDashboard";
import CourseSchedule from "@/components/CourseSchedule/CourseSchedule";
import { useCourseStore } from "@/store/course";
import { storeToRefs } from "pinia";
import {ElLoading} from "element-plus";

export default {
  name: "CourseView",
  data() {
    return {
      loadingObj: null
    }
  },
  components: {
    CourseDashboard,
    CourseSchedule,
    Menu
  },
  setup() {
    const courseStore = useCourseStore();
    const { appLoading, schedule } = storeToRefs(useCourseStore());
    return {
      courseStore,
      appLoading,
      schedule
    }
  },
  async created() {
    const data = await this.courseStore.get_schedule_summary();
    // console.log(toRaw(this.schedule.timeline));
    // console.log(toRaw(this.schedule.courses));
    // this.courseStore.get_schedule_table();
  },
  methods: {
    openLoading() {
      this.loadingObj = ElLoading.service({
        lock: true,
      })
    }
  },
  watch: {
    appLoading() {
      if (this.appLoading) {
        this.openLoading();
      }else {
        this.loadingObj.close();
      }
    }
  }
}
</script>

<style scoped>
  #app-nav {
    position: fixed;
    left: 0;
    width: 300px;
    height: calc(var(--vh) * 100);
    z-index: 1;
  }
  #app-frame {
    position: relative;
    width: 100%;
    height: calc(var(--vh) * 100);
  }
  #app-frame> .frame-inner {
    width: calc(100% - 300px);
    max-width: calc(100% - 300px);
    left: 300px;
    height: 100%;
    position: absolute;
    overflow: auto;
  }
</style>