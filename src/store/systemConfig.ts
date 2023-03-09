import { defineStore } from "pinia";
import { request } from "@/api";
import moment from "moment";
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
      const today = moment();
      for (const timeDate of result.res.data) {
        const startDate = moment(timeDate.start_at);
        const endDate = moment(timeDate.end_at);
        if (today > endDate) continue;
        this.nextEvent = timeDate; // FIXME these are completely different
        this.nextEvent.timeRange = [startDate.toDate(), endDate.toDate()];
        if (today > startDate) {
          this.nextEvent.status = "結束";
          this.nextEvent.closestTime = moment(timeDate.end_at).toDate();
        } else {
          this.nextEvent.status = "開始";
          this.nextEvent.closestTime = moment(timeDate.start_at).toDate();
        }
      }
    },
  },
});
