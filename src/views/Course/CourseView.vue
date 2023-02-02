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
import Menu from "@/components/CourseSchedule/Menu.vue";
import CourseDashboard from "@/components/CourseSchedule/CourseDashboard.vue";
import CourseSchedule from "@/components/CourseSchedule/CourseSchedule.vue";
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
      const data = await this.courseStore.getScheduleSummary();
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
