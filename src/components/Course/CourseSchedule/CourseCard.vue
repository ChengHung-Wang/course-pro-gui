<template>
  <div class="course-card" :style="getStyle()">
    <div class="inner" :class="{ small: size === 1 }">
      <h5>{{ title }}</h5>
      <p>{{ classroom }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { useCourseStore } from "@/store/course/course";
import { storeToRefs } from "pinia";
import { toRaw } from "vue";

export default {
  props: {
    size: {
      type: Number,
      default: 1,
    },
    row: {
      type: Number,
      default: 0,
    },
    col: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
    classroom: {
      type: String,
      default: "",
    },
  },
  setup() {
    const { schedule } = storeToRefs(useCourseStore());
    return {
      schedule,
    };
  },
  methods: {
    getStyle() {
      const colAmount = toRaw(this.schedule).colAmount;
      const componentPadding = 24;
      return {
        width: `calc((((100% - ${
          componentPadding / 2
        }px) / ${colAmount}) - 12px) * ${this.size} + (12px * ${
          this.size - 1
        }))`,
        top: `calc((92px + 24px) * ${this.row})`,
        left: `calc((((100% - ${
          componentPadding / 2
        }px) / ${colAmount}) - 12px) * ${this.col} + (12px * ${
          this.col - 1
        }) + 12px)`,
      };
      // const cardWidth = window.document.getElementsByClassName("schedule-card")[0].offsetWidth;
      // console.log(cardWidth);
      // return {
      //   width: `calc((((100% - 24px) / ${colAmount}) - 12px) * ${this.size} + (12px * ${this.size - 1}))`,
      //     top: `calc((92px + 24px) * ${this.row})`,
      //     left: `calc((${cardWidth}px + 12px) * ${this.col})`
      // }
    },
  },
};
</script>

<style scoped>
.course-card {
  position: absolute;
  height: 92px;
  margin: 12px 6px 12px 0;
  left: 0;
  top: 0;
}
.inner {
  background-image: linear-gradient(to top, #4481eb, #409eff);
  border-radius: 6px;
  height: 100%;
  width: 100%;
  padding: 12px;
  color: white;
}
h5 {
  font-size: 16px;
}
p {
  text-align: right;
  color: white;
  margin: 0;
  position: absolute;
  right: 12px;
  bottom: 6px;
}
.small {
  padding: 8px;
}
.small h5 {
  font-size: 13px;
}
.small p {
  font-size: 12px;
  right: 12px;
  bottom: 3px;
}
</style>
