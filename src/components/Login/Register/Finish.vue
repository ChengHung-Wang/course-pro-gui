<template>
  <div class="register-contain">
    <div class="h-100 fcc">
      <el-result
        icon="success"
        title="註冊成功"
        sub-title="請使用您常用的Email來作為登入系統的信箱"
      >
        <template #extra>
          <el-button type="primary" @click="router.push('/')">進入系統</el-button>
          <br /><br /><br />
        </template>
      </el-result>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    return {
      router
    };
  }

});
</script>

<style scoped></style>
