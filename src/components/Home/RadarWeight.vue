<template>
  <div id="radar-weight" class="weight-count col-6 fec">
    <div class="fec" v-if="radarStore.radarStart">
      <h1 class="text-dark w-100">{{ radarStore.scanNum }}</h1>
      <p class="m-0">平均掃描時間: {{ radarStore.scanAvg }} /ms</p>
    </div>
    <div class="fec" v-if="!radarStore.radarStart">
      <el-button @click="start()" type="primary" size="large" icon="Aim"
        >啟動雷達</el-button
      >
    </div>
  </div>
</template>

<script>
import { useGlobalStore } from "@/store/global";
import { useRadarStore } from "@/store/radar";
import { ElMessageBox } from "element-plus";

export default {
  name: "RadarWeight.vue",
  setup() {
    const globalStore = useGlobalStore();
    const radarStore = useRadarStore();
    return {
      globalStore,
      radarStore,
    };
  },
  methods: {
    start() {
      ElMessageBox.confirm(
        "您必須保持您的網路連線順暢且必須一直留在這個頁面。您的資料將被送至 Google Cloud Platform 以用於搶課雷達掃瞄作業，請問您同意這樣做嗎？",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(async () => {
          this.globalStore.enableLoading();
          // check permission
          const auth = await this.radarStore.checkPermission();
          let hasAuth = false;
          auth.res.data.forEach((e) => {
            if (e.app.route_prefix === "/radar" && e.available) {
              hasAuth = true;
            }
          });
          if (hasAuth) {
            this.radarStore.startScan();
            this.radarStore.radarStart = true;
          } else {
            this.globalStore.disableLoading();
            ElMessageBox.confirm("不具備雷達使用權限。", "Error", {
              type: "error",
              showClose: false,
              showConfirmButton: false,
              cancelButtonText: "知道了",
            });
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
#radar-weight {
  margin-top: -24px;
}
</style>
