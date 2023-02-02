import { defineStore } from "pinia";

export const useRadarStore = defineStore("radar", {
  state: () => ({
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
  actions: {},
});
