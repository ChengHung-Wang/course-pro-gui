import { defineStore } from "pinia";
import { request } from "@/api";
import type { Department, College } from "@/models/identity";
import moment from "moment";

export const useSystemConfigStore = defineStore("systemConfig", {
  state: () => ({
    colleges: Array<College>(),
    departments: Array<Department>(),
    nextEvent: {
      timeRange: [new Date(), new Date()],
      status: "",
      closestTime: "",
    },
  }),
  actions: {
    async getDepartments() {
      const result = await request("GET", "/system/map/departments");
      if (result.status != 200) return false;
      this.colleges = result.res.data.colleges;
      this.departments = result.res.data.departments;
      return result.res.data;
    },

    async getNextEvent() {
      const result = await request("GET", "/system/map/time/registration");
      if (result.status != 200) return false;
      const today = moment();
      for (let timeDate of result.res.data) {
        const startDate = moment(timeDate.start_at);
        const endDate = moment(timeDate.end_at);
        if (today > endDate) continue;
        this.nextEvent = timeDate;
        this.nextEvent.timeRange = [startDate.toDate(), endDate.toDate()];
        if (today > startDate)
          (this.nextEvent.status = "結束"),
            (this.nextEvent.closestTime = moment(timeDate.end_at));
        else
          (this.nextEvent.status = "開始"),
            (this.nextEvent.closestTime = moment(timeDate.start_at));
        return this.nextEvent;
      }
    },
  },
});
