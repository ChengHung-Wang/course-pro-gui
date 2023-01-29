<template>
  <div class="columns" v-bind:style="{'width': `calc(100% / ${size})`}">
    <p class="m-0 column-text">
      {{ start }}
      <br>
      {{ end }}
      <br>
      {{ num }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Column",
  props: {
    num: String,
    start: String,
    end: String,
    size: Number
  }
}
</script>

<style scoped>
  .columns:first-child {
    margin-left: 0;
  }
  .columns:last-child {
    margin-right: 0;
  }
  .columns {
    min-width: 72px;
    margin: 6px;
    height: 75px;
  }

  .column-text {
    text-overflow: clip;
    word-break: break-all;
    text-align: center;
    color: #979797;
  }
</style>