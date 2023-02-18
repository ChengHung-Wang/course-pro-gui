<template>
  <div class="register-contain">
    <div class="h-100 fcc">
      <el-result
        icon="success"
        title="註冊成功"
        sub-title="請使用您常用的Email來作為登入系統的信箱"
      >
        <template #extra>
          <el-button type="primary" @click="enterSystem">進入系統</el-button>
          <br /><br /><br />
        </template>
      </el-result>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useGlobalStore } from "@/store/global";

export default defineComponent({
  setup() {
    const router = useRouter();
    const globalStore = useGlobalStore();
    return {
      router, 
      globalStore,
    };
  }, 
  methods: {
    enterSystem() {
      this.globalStore.enableLoading();
      this.router.push('/');
    }
  }

});
</script>

<style scoped></style>
