import { defineStore } from "pinia";
import { request } from "@/api";
import type { SystemMapDepartmentsApi } from "@/models/api/system/map/departments";
import type { SystemMapTimeRegistrationApi } from "@/models/api/system/map/time/registration";

interface State {
  colleges: SystemMapDepartmentsApi["data"]["colleges"];
  departments: SystemMapDepartmentsApi["data"]["departments"];
  nextEvent: {
    timeRange: [Date, Date];
    status: string;
    closestTime: Date;
  };
}

export const useSystemConfigStore = defineStore("systemConfig", {
  state: (): State => ({
    colleges: [],
    departments: [],
    nextEvent: {
      timeRange: [new Date(), new Date()],
      status: "",
      closestTime: new Date(),
    },
  }),
  actions: {
    async getDepartments() {
      const result = await request<SystemMapDepartmentsApi>(
        "GET",
        "/system/map/departments"
      );
      if (result.status != 200) return;
      this.colleges = result.res.data.colleges;
      this.departments = result.res.data.departments;
    },

    async getNextEvent() {
      const result = await request<SystemMapTimeRegistrationApi>(
        "GET",
        "/system/map/time/registration"
      );
      if (result.status != 200) return;
      const now = new Date();
      for (const timeDate of result.res.data) {
        const startDate = new Date(timeDate.start_at);
        const endDate = new Date(timeDate.end_at);
        if (now > endDate) continue;
        this.nextEvent = timeDate; // FIXME these are completely different
        this.nextEvent.timeRange = [startDate, endDate];
        if (now > startDate) {
          this.nextEvent.status = "結束";
          this.nextEvent.closestTime = startDate;
        } else {
          this.nextEvent.status = "開始";
          this.nextEvent.closestTime = endDate;
        }
      }
    },
  },
});
