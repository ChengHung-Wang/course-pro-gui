<template>
  <el-table :data="table.data" class="semester-table">
    <el-table-column
        v-for="(column, index) in table.columns"
        :key="index"
        :prop="column.prop"
        :label="column.label"
    ></el-table-column>
  </el-table>
</template>

<script lang="ts">
export default {
  name: "Table",
  props: {
    table: Object
  }
}
</script>

<style scoped>

</style>