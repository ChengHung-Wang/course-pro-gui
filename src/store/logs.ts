import { defineStore } from "pinia";

export const useLogsStore = defineStore("logs", {
  state: () => ({
    menu: {
      items: [],
      active: 0,
    },
  }),
  actions: {},
});
