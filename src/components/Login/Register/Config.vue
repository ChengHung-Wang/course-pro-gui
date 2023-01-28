<template>
  <div class="register-contain">
    <h3 class="text-dark">系統偏好設置</h3>
  </div>
</template>

<script>
import {useLoginStore} from "@/store/login";
import {storeToRefs} from "pinia";

export default {
  name: "Config",
  setup() {
    const loginStore = useLoginStore();
    const { fields } = storeToRefs(useLoginStore());
    return {
      fields,
      loginStore
    }

  }
}
</script>
