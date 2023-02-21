<template>
  <div class="course-dashboard component-padding">
    <div class="container-fluid m-0 p-0">
      <div class="row d-flex">
        <div class="col-auto left-container">
          <div class="summary-card summary-success-card">
            <div class="badge-header">
              <div class="left-text">
                <div class="title">
                  {{ courseStore.maximumCredits }} / {{ courseStore.schedule.totalCredit }}
                </div>
                <span class="description">可選學分 / 已選學分</span>
              </div>
              <div class="right-text" v-if="Object.keys(systemConfigStore.nextEvent).length>3">
                <strong>
                  距離 {{ systemConfigStore.nextEvent.name_zh }} {{ systemConfigStore.nextEvent.status }} 還剩<br/>
                  {{ (Math.floor(diffSec / 60 / 60 / 24)) }}天
                  {{ ("0" + Math.floor(diffSec / 60 / 60) % 24).slice(-2) }}小時
                  {{ ("0" + Math.floor(diffSec / 60) % 60).slice(-2) }}分鐘
                  {{ ("0" + Math.floor(diffSec) % 60).slice(-2) }}秒
                </strong>
              </div>
            </div>

            <div class="summary-badge fsc">
              <el-icon class="icon" size="24">
                <SuccessFilled/>
              </el-icon>
              <span class="badge-description">
                <strong>課程模塊運作正常</strong><br/>
                檢查時間: {{ date.split("T")[0] }} {{ date.split("T")[1].split("+")[0] }}
              </span>
            </div>
          </div>
        </div>
        <div class="right-container">
          <div class="summary-card">
            <el-empty :image-size="60" size="50" description="開發中..."/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {useCourseStore} from "@/store/course";
import {useSystemConfigStore} from "@/store/systemConfig";
import {useGlobalStore} from "@/store/global";
import moment from 'moment'

export default {
  data() {
    return {
      diffSec: 0,
    }
  },
  setup() {

    const courseStore = useCourseStore();
    const systemConfigStore = useSystemConfigStore();
    const globalStore = useGlobalStore();
    const date = courseStore.checkTime.toString();

    globalStore.enableLoading();
    return {
      courseStore,
      systemConfigStore,
      globalStore,
      date,
    };
  },
  created: async function () {
    let resolve = 0;
    const loadingEvents = [
      this.courseStore.getMaxiumCredits().then(() => {
        resolve++;
      }),
      this.courseStore.getScheduleSummary().then(() => {
        resolve++;
      }),
      this.systemConfigStore.getNextEvent().then(() => {
        resolve++;
      })
    ];
    setInterval(() => {
      if (resolve >= 3) {
        resolve = 0;
        this.countDown();
        setInterval(this.countDown, 500);
        this.globalStore.disableLoading();
      }
    })
  },
  methods: {
    countDown() {
      this.diffSec = moment(this.systemConfigStore.nextEvent.closestTime).diff(moment()) / 1000;
    },
  }
};
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
  background-color: var(--el-color-success) !important;
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

.left-container {
  width: 400px;
}

.right-container {
  width: calc(100% - 400px);
}

.right-container .summary-card {
  align-items: center;
  justify-content: center;
}
</style>
