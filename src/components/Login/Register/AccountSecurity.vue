<template>
  <div class="register-contain">
    <h3 class="text-dark">帳戶安全</h3>
    <span>
      當你忘記密碼時，這些問題可以幫助你找回帳戶。<br />
      這些問題只有你能知道。
    </span>
    <div class="container-fluid m-0 p-0">
      <div class="row mt-4">
        <div class="col-6" v-for="q in loginStore.questions">
          <p>{{ q.question_description }}</p>
          <el-input
            size="large"
            class="w-100"
            v-model="q.reply"
            :validate-event="true"
          ></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useLoginStore } from "@/store/login";
import { toRaw } from "vue";

export default defineComponent({
  setup() {
    const loginStore = useLoginStore();
    return {
      loginStore,
    };
  },
  async created() {
    if (this.loginStore.questions[0] == undefined)
      await this.loginStore.getSecurityQuestion();
  },
});
</script>

<style scoped></style>
