<template>
  <div class="container-fluid component-padding m-0">
    <div class="row">
      <div class="col-12 mt-5">
        <h2>歷史</h2>
      </div>
    </div>
  </div>
  <div class="row component-padding" v-if="!historyStore.isLoading" v-for="(table, index) in historyStore.tableData" :key="index">
    <div class="col-1">
      <h2 class="semester-title">{{ table.semester }}</h2>
    </div>
    <div class="col-11">
      <el-row v-if="historyStore.creditLists[index] !== undefined" :gutter="12">
        <el-col :span="8">
          <el-card class="mb-5" shadow="always"> 被當學分數 {{ historyStore.creditLists[index].credit.failedCredit }} </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="mb-5" shadow="always"> 低於平均學分數 {{ historyStore.creditLists[index].credit.lowerAverageCredit }}</el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="mb-5" shadow="always"> 安全學分數 {{ historyStore.creditLists[index].credit.safeCredit }}</el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="mb-5" shadow="always"> 二退學分數 {{ historyStore.creditLists[index].credit.secondDropCredit }} </el-card>
        </el-col>
        <el-col :span="8">
          <h3> 平均GPA {{ historyStore.creditLists[index].credit.GPAAverage.toFixed(2) }}</h3>
        </el-col>
        <el-col :span="8">
          <h3> 失分 {{ historyStore.creditLists[index].credit.lostScoreTotal.toFixed(2) }}</h3>
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
  </div>
</template>

<script lang="ts">
import { useCourseStore } from "@/store/course/course";
import { useHistoryStore } from "@/store/course/history";

export default {
  setup() {
    const courseStore = useCourseStore();
    const historyStore = useHistoryStore();
    return {
      courseStore,
      historyStore,
    };
  },
  async mounted() {
    this.courseStore.menu.active = 3;
    await this.historyStore.getSemesterCreditInformation();
    this.historyStore.isLoading = false;
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
