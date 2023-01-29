<template>
  <div class="schedule-card" v-bind:style="{'width': `calc(100% / ${size})`}">
    <div class="inner-card">
    </div>
  </div>
</template>

<script>
export default {
name: "EmptyCard",
  props: {
    size: Number
  }
}
</script>

<style>
  .schedule-card {
    margin: 12px 6px;
    min-width: 72px;
    height: 92px;
    background-image: linear-gradient(to top, #F4F7FF, #FFFFFF);
    border: .1px rgba(0, 0, 0, .1) solid;
    border-radius: 6px;
  }
  .schedule-card:first-child {
    margin-left: 0;
  }
  .schedule-card:last-child {
    margin-right: 0;
  }
</style>