import { defineStore } from "pinia";
import {request} from "@/api";
import {useGlobalStore} from "@/store/global";
import moment from "moment";

export const useRadarStore = defineStore("radar", {
  state: () => ({
    startScan: false,
    scanNum: 0,
    scanAvg: 0,
    lastUpdateAvg: moment(),
    radarInterval: 200,
    ssoRefreshInterval: 1000 * 60 * 9.5,
    maxPending: 4,
    pendingNow: 0,
    menu: {
      items: [
        {
          icon: "",
          displayName: "總覽",
          click: () => {},
        },
        {
          icon: "",
          displayName: "服務列表",
          click: () => {},
        },
        {
          icon: "",
          displayName: "嗅探設定",
          click: () => {},
        },
      ],
      active: 0,
    },
  }),
  actions: {
    async checkPermission() {
      return await request("GET", "/system/auth");
    },
    async scan() {
      return await request('GET', '/radar/scan');
    },
    async refreshSSO() {
      return await request("PUT", '/account/sso');
    },
    async startScan() {
      // sso service
      await this.refreshSSO();
      setInterval(() => {
        this.pendingNow ++;
        this.scanNum ++;
        this.refreshSSO().then(e => {
          this.pendingNow --;
        });
      }, this.ssoRefreshInterval);
      setInterval(() => {
        if (this.pendingNow <= this.maxPending) {
          this.pendingNow ++;
          this.scanNum ++;
          this.scan().then((e) => {
            this.pendingNow --;
            if (moment().valueOf() - this.lastUpdateAvg.valueOf() > 500) {
              this.lastUpdateAvg = moment();
              this.scanAvg = e.endAt.valueOf() - e.startAt.valueOf();
            }
          })
        }
      }, this.radarInterval)
      useGlobalStore().disableLoading();
    }
  },
});
