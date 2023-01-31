<template>
  <div class="course-dashboard component-padding">
    <div class="container-fluid m-0 p-0">
      <div class="row">
        <div class="col-4">
          <div class="summary-card summary-success-card">
            <div class="badge-header">
              <div class="left-text">
                <div class="title">
                  31 / {{ courseStore.schedule.totalCredit }}
                </div>
                <span class="description">可選學分 / 已選學分</span>
              </div>
              <div class="right-text">
                <strong>
                  距離選課結束還剩<br />
                  3天 12小時 1分鐘 23秒
                </strong>
              </div>
            </div>

            <div class="summary-badge fsc">
              <el-icon class="icon" size="24"><SuccessFilled /></el-icon>
              <span class="badge-description">
                <strong>課程模塊運作正常</strong><br>
                檢查時間: 2023-05-20 10:03:02
              </span>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="summary-card">
            <el-empty image-size="60" size="50" description="開發中..." />
          </div>
        </div>
        <div class="col-4">
          <div class="summary-card">
            <el-empty image-size="60" size="50" description="開發中..." />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCourseStore } from "@/store/course";

export default {
  name: "CourseDashboard",
  setup() {
    const courseStore = useCourseStore();
    return {
      courseStore
    }
  }

}
</script>

<style scoped>
  .summary-card {
    height: 170px;
    width: 100%;
    padding: 12px 18px;
    background-color: var(--el-fill-color-extra-light);
    box-shadow: var(--normal-shadow);
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .summary-success-card {
    background-color: var(--el-color-success)!important;
    color: white;
  }
  .summary-badge {
    width: 90%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -12px;
    color: var(--el-color-success);
    height: 72px;
    background-color: var(--el-color-success-light-8);
    padding: 12px;
  }
  .summary-badge .icon {
    margin-right: 6px;
  }
  .summary-badge .badge-description {
    font-size: 14px;
    color: var(--el-color-success);
    line-height: 1.4;
  }
  .badge-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .summary-success-card .title {
    font-size: 40px;
    font-weight: 700;
    padding: 0;
    margin: 0;
    line-height: 1.1;
  }
  .summary-success-card .description {
    font-size: 14px;
  }
  .summary-card .right-text {
    text-align: right;
    font-size: 13px;
  }
</style>