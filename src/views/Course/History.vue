<template>
  <el-scrollbar max-height="100vh">
    <div class="container-fluid component-padding m-0 pb-0">
      <div class="row">
        <div class="col-12 mt-5">
          <h2 class="mb-0">歷史</h2>
        </div>
      </div>
      <div
        class="row mt-5"
        v-if="!historyStore.isLoading"
        v-for="(table, index) in historyStore.tableData"
        :key="index"
      >
        <div class="col-1">
          <h3 class="semester-title">{{ table.semester }}</h3>
          <span>XX/XX</span>
        </div>
        <div class="col-11">
          <div class="container-fluid m-0 p-0">
            <div class="row">
              <HistoryCard
                icon="/src/assets/icons/icons8-high_priority.svg"
                :num="historyStore.creditLists[index].credit.failedCredit"
                title="被當"
                color="#F44F5A"
                sub-title="學分數"
              />
              <HistoryCard
                icon="/src/assets/icons/icons8-warning_shield.svg"
                :num="historyStore.creditLists[index].credit.lowerAverageCredit"
                title="低於平均"
                color="#FEB705"
                sub-title="學分數"
              />
              <HistoryCard
                icon="/src/assets/icons/icons8-ok.svg"
                :num="historyStore.creditLists[index].credit.safeCredit"
                title="安全"
                color="#21AD64"
                sub-title="學分數"
              />
              <HistoryCard
                icon="/src/assets/icons/icons8-headstone.svg"
                :num="historyStore.creditLists[index].credit.secondDropCredit"
                title="二退"
                color="#888888"
                sub-title="學分數"
              />
            </div>
          </div>
          <HistoryTable class="mb-3" :table="table" />
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts">
import { useCourseStore } from "@/store/course/course";
import { useHistoryStore } from "@/store/course/history";
import Card from "@/components/Course/History/Card.vue";
import Table from "@/components/Course/History/Table.vue";

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
  components: {
    HistoryCard: Card,
    HistoryTable: Table,
  },
};
</script>

<style scoped>
.semester-frame {
  padding: 30px;
}
.semester-table {
  /* margin: 30px; */
}
</style>
