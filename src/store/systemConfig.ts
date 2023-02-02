import { defineStore } from "pinia";
import { useGlobalStore } from "@/store/global";
import { ref } from "vue";
import { ElLoading } from "element-plus";

export const useSystemConfigStore = defineStore("systemConfig", {
  state: () => ({
    colleges: ref([]),
    departments: ref([]),
  }),
  actions: {
    async get_departments() {
      const loading = ElLoading.service();
      const result = await useGlobalStore().send("/api/v2/system/departments");
      loading.close();
      if (result.status === 200) {
        return result.res.data;
      }
      return false;
    },
  },
});
