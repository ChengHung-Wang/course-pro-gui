<template>
  <div class="register-contain">
    <h3 class="text-dark">課程規劃</h3>
  </div>
</template>

<script>
import {useLoginStore} from "@/store/login";
import {storeToRefs} from "pinia";

export default {
  name: "CoursePlan",
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