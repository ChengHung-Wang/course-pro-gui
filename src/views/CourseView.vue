<template>
  <div id="app-root">
    <div id="app-nav">
    </div>
    <div id="app-frame">
      <div class="frame-inner">
        <div class="container-fluid component-padding m-0">
          <div class="row">
            <div class="col-12 fbc">
              <h3 class="m-0">課表預覽</h3>
              <el-link href="#" class="text-primary m-0">在課表中查看</el-link>
            </div>
          </div>
        </div>
        <CourseSchedule />
      </div>
    </div>
  </div>
</template>

<script>
import CourseSchedule from "@/components/CourseSchedule/CourseSchedule";
import { useCourseStore } from "@/store/course";
import {storeToRefs} from "pinia";
import {ElLoading} from "element-plus";
import {ref, toRaw} from "vue";

export default {
  name: "Course",
  data() {
    return {
      loadingObj: null
    }
  },
  components: {
    CourseSchedule
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
    // this.openLoading();
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
    height: 100vh;
    background: #eee;
  }
  #app-frame {
    position: relative;
    width: 100%;
    height: 100vh;
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