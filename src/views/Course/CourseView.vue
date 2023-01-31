<template>
  <div id="app-root">
    <div id="app-nav">
      <Menu :app-id="0" :menu="courseStore.menu" />
    </div>
    <div id="app-frame">
      <div class="frame-inner">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Menu from "@/components/CourseSchedule/Menu";
import CourseDashboard from "@/components/CourseSchedule/CourseDashboard";
import CourseSchedule from "@/components/CourseSchedule/CourseSchedule";
import { useCourseStore } from "@/store/course";
import { storeToRefs } from "pinia";
import { ElLoading } from "element-plus";
import { toRaw } from "vue";

export default {
  name: "CourseView",
  data() {
    return {
      loadingObj: null,
    };
  },
  components: {
    CourseDashboard,
    CourseSchedule,
    Menu,
  },
  setup() {
    const courseStore = useCourseStore();
    const { appLoading, schedule } = storeToRefs(useCourseStore());
    return {
      courseStore,
      appLoading,
      schedule,
    };
  },
  async created() {
    if (toRaw(this.courseStore.schedule).totalCredit === -1) {
      const data = await this.courseStore.get_schedule_summary();
    }
  },
  methods: {
    openLoading() {
      this.loadingObj = ElLoading.service({
        lock: true,
      });
    },
  },
  watch: {
    appLoading() {
      if (this.appLoading) {
        this.openLoading();
      } else {
        this.loadingObj.close();
      }
    },
  },
};
</script>
