<template>
  <div class="container-fluid component-padding m-0">
    <div class="row">
      <div class="col-12 mt-5">
        <h2>歷史</h2>
      </div>
    </div>
  </div>
  <div>
    <div v-if="!history.isLoading" class="semester-frame" v-for="(table, index) in history.tableData" :key="index">
      <h2 class="semester-title">{{ table.semester }}</h2>
      <el-row v-if="history.creditLists[index] != undefined" :gutter="12">
        <el-col :span="8">
          <el-card shadow="always"> 被當學分數 {{ history.creditLists[index].credit.failedCredit }} </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always"> 低於平均學分數 {{ history.creditLists[index].credit.lowerAverageCredit }}</el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always"> 安全學分數 {{ history.creditLists[index].credit.safeCredit }}</el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always"> 二退學分數 {{ history.creditLists[index].credit.secondDropCredit }} </el-card>
        </el-col>
        <el-col :span="8">
          <h3> 平均GPA {{ history.creditLists[index].credit.GPAAverage.toFixed(2) }}</h3>
        </el-col>
        <el-col :span="8">
          <h3> 失分 {{ history.creditLists[index].credit.lostScoreTotal.toFixed(2) }}</h3>
        </el-col>
      </el-row>
      <el-table :data="table.data" class="semester-table">
        <el-table-column
          v-for="(column, index) in table.columns"
          :key="index"
          :prop="column.prop"
          :label="column.label"
        ></el-table-column>
      </el-table>
    </div>
    <div v-else>
      <div v-loading="history.isLoading">Loading...</div>
    </div>
  </div>
</template>

<script lang="ts">
import { useCourseStore } from "@/store/course";
import { useHistoryStore } from "@/store/history";

export default {
  setup() {
    const courseStore = useCourseStore();
    const history = useHistoryStore();
    return {
      courseStore,
      history,
    };
  },
  mounted() {
    this.courseStore.menu.active = 3;
    this.history.getSemesterCreditInformation();
    this.history.isLoading = false;
    
  },
};

</script>


<style scoped>

.semester-frame{
  padding: 30px;
}
.semester-table{
  /* margin: 30px; */
}
</style>
