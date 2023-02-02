import { defineStore } from "pinia";
import { useGlobalStore } from "@/store/global";
import { ref } from "vue";
import { ElLoading } from "element-plus";
import { request } from "@/api";

export const useSystemConfigStore = defineStore("systemConfig", {
  state: () => ({
    colleges: ref([]),
    departments: ref([]),
  }),
  actions: {
    async get_departments() {
      const loading = ElLoading.service();
      const result = await request("GET", "/system/departments");
      loading.close();
      if (result.status === 200) {
        return result.res.data;
      }
      return false;
    },
  },
});
