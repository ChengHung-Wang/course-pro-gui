<template>
  <div class="course-card"
       v-bind:style="getStyle()">
    <div class="inner" v-bind:class="{small: size === 1}">
      <h5>{{ title }}</h5>
      <p>{{ classroom }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    size: {
      type: Number,
      default: 1
    },
    row: {
      type: Number,
      default: 0
    },
    col: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ""
    },
    classroom: {
      type: String,
      default: ""
    }
  },
  created() {
    if (this.size === undefined){
      this.size = 1
    }
  },
  methods: {
    getStyle() {
      const offset = parseInt(this.col / 4) * 12 - parseInt(this.col / 4);
      return {
        width: `calc((((100% - 24px) / 14) - 12px) * ${this.size} + (12px * ${this.size - 1}))`,
        top: `calc((92px + 24px) * ${this.row})`,
        left: `calc(((100% / 14) * ${this.col}) - (12px / 4 * (${this.col % 4})) - ${this.col >= 4 ? offset : 0}px)`
      };
      // const cardWidth = window.document.getElementsByClassName("schedule-card")[0].offsetWidth;
      // console.log(cardWidth);
      // return {
      //   width: `calc((((100% - 24px) / 14) - 12px) * ${this.size} + (12px * ${this.size - 1}))`,
      //     top: `calc((92px + 24px) * ${this.row})`,
      //     left: `calc((${cardWidth}px + 12px) * ${this.col})`
      // }
    }
  }
}
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
    background-image: linear-gradient(to top, #4481EB, #409EFF);
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