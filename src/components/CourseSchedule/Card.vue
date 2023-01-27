<template>
  <div class="schedule-card">
    <div class="inner-card">
      <div class="course-name">
        課程名稱
      </div>
      <div class="classroom">
        TR-878
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "Card"
}
</script>

<style>
  .schedule-card {
    margin: 12px 6px;
    color: white;
    height: calc(90px + 24px);
    width: 100%;
    min-width: 72px;
  }
  .schedule-card:first-child {
    margin-left: 12px;
  }
  .schedule-card:last-child {
    margin-right: 12px;
  }
  .inner-card {
    background-image: linear-gradient(to top, #F4F7FF, #FFFFFF);
    padding: 12px;
    height: 100%;
    border-radius: 12px;
  }
  .course-name {
    font-size: 18px;
    font-weight: 600;
  }
  .classroom {
    font-size: 14px;
  }
</style>