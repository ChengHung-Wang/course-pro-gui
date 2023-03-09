<template>
  <div id="CourseSchedule" class="component-padding">
    <div class="schedule-inner">
      <ScheduleRowIcon class="schedule-date" />
      <div class="schedule-contain">
        <div class="schedule-headers">
          <Column
            :start="data.start_at"
            :end="data.end_at"
            :num="data.hold_on"
            :size="schedule.timeline[Object.keys(schedule.timeline)[0]].length"
            v-for="data in schedule.timeline[Object.keys(schedule.timeline)[0]]"
          />
        </div>
        <div class="course-empty-card">
          <div
            class="d-flex empty-card-row"
            v-for="thisDay in schedule.timeline"
          >
            <EmptyCard
              :size="thisDay.length"
              v-for="data in thisDay"
              :key="data.id"
            />
          </div>
          <div class="course-card-container" v-if="schedule.courses.length > 0">
            <CourseCard
              v-for="data in courseStore.getScheduleTable()"
              :size="data.size"
              :col="data.col"
              :row="data.row"
              :classroom="data.courseInfo.classroom_on[0]"
              :title="data.courseInfo.name_zh"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Column from "@/components/Course/CourseSchedule/Column.vue";
import ScheduleRowIcon from "@/components/Course/CourseSchedule/ScheduleRowIcon.vue";
import EmptyCard from "@/components/Course/CourseSchedule/EmptyCard.vue";
import CourseCard from "@/components/Course/CourseSchedule/CourseCard.vue";
import { useCourseStore } from "@/store/course/course";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const courseStore = useCourseStore();
    const { schedule } = storeToRefs(courseStore);
    return {
      courseStore,
      schedule,
    };
  },
  components: {
    EmptyCard,
    CourseCard,
    Column,
    ScheduleRowIcon,
  },
};
</script>

<style scoped>
#CourseSchedule {
  position: relative;
  right: 0;
  width: 100%;
  overflow-x: auto;
}
#CourseSchedule .schedule-inner {
  display: flex;
}
#CourseSchedule .schedule-contain {
  width: 100%;
  padding-left: 24px;
}
#CourseSchedule .schedule-headers {
  display: flex;
}
.course-empty-card {
  position: absolute;
  padding-right: 24px;
  display: flex;
  flex-wrap: wrap;
}
.empty-card-row {
  width: 100%;
}
</style>
