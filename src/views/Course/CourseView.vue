<template>
  <div id="app-root">
    <div id="app-nav">
      <SideMenu :app-id="0" :menu="courseStore.menu" />
    </div>
    <div id="app-frame">
      <div class="frame-inner">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SideMenu from "@/components/CourseSchedule/SideMenu.vue";
import CourseDashboard from "@/components/CourseSchedule/CourseDashboard.vue";
import CourseSchedule from "@/components/CourseSchedule/CourseSchedule.vue";
import { useCourseStore } from "@/store/course";
import { storeToRefs } from "pinia";
import { ElLoading } from "element-plus";
import { toRaw } from "vue";

export default {
  setup() {
    const courseStore = useCourseStore();
    const { appLoading, schedule } = storeToRefs(courseStore);
    const loadingObj = {} as any;
    return {
      courseStore,
      appLoading,
      schedule,
      loadingObj,
    };
  },
  components: {
    CourseDashboard,
    CourseSchedule,
    SideMenu,
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
