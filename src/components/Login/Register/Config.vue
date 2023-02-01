<template>
  <div class="register-contain">
    <h3 class="text-dark">系統偏好設置</h3>
    <div class="fcc h-100">
      <el-empty description="開發中..." />
    </div>
  </div>
</template>

<script lang="ts">
import { useLoginStore } from "@/store/login";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const loginStore = useLoginStore();
    const { fields } = storeToRefs(useLoginStore());
    return {
      fields,
      loginStore,
    };
  },
});
</script>
