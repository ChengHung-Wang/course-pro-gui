import { defineStore } from "pinia";
import { ElLoading } from "element-plus";
import { request } from "@/api";
import type { Department, College } from "@/models/identity";

export const useSystemConfigStore = defineStore("systemConfig", {
  state: () => ({
    colleges: Array<College>,
    departments: Array<Department>,
    nextEvent: {
      timeRange: [new Date, new Date]
    },
  }),
  actions: {
    async getDepartments() {
      const loading = ElLoading.service();
      const result = await request("GET", "/system/map/departments");
      loading.close();
      if (result.status != 200) return false;
      this.colleges = result.res.data.colleges;
      this.departments = result.res.data.departments;
      return result.res.data;
    },
    async getNextEvent() {
      const result = await request("GET", "/system/map/time/registration");
      if(result.status != 200) return false;
      const today = new Date();
      for(let timeDate of result.res.data) {
        const startDate = new Date(timeDate.start_at);
        const endDate = new Date(timeDate.end_at);
        if(today > endDate) continue;
        this.nextEvent = timeDate;
        this.nextEvent.timeRange = [startDate, endDate];
        return this.nextEvent;
      }
    },
  },
});
