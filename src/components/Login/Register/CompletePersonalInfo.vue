<template>
  <div class="register-contain">
    <h3 class="text-dark">完善個人信息</h3>
  </div>
</template>

<script>
import {useLoginStore} from "@/store/login";
import {storeToRefs} from "pinia";

export default {
  name: "CompletePersonalInfo",
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