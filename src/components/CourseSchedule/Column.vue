<template>
  <div class="columns">
    <p>
      1
      <br>
      08:10
      <br>
      09:10
    </p>
  </div>
</template>

<script>
export default {
name: "Column"
}
</script>

<style>
  .columns:first-child {
    margin-left: 12px;
  }
  .columns:last-child {
    margin-right: 12px;
  }
  .columns {
    text-align: center;
    width: 100%;
    min-width: 72px;
    margin: 6px;
  }

  p {
    text-overflow: clip;
    word-break: break-all;
    text-align: center;
    color: #979797;
  }
</style>