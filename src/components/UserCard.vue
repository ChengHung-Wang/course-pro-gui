<template>
  <div class="user-card">
    <div class="inner fsc">
      <div class="avatar">
        <el-popconfirm v-if="logoutButton" @confirm="loginStore.logout" title="登出系統?">
          <template #reference>
            <el-avatar class="avatar" shape="circle" :size="size === undefined ? 80 : parseInt(size)">
              <h3>+</h3>
            </el-avatar>
          </template>
        </el-popconfirm>
        <el-avatar v-if="!logoutButton" class="avatar" shape="circle" :size="size === undefined ? 80 : parseInt(size)">
          <h3>+</h3>
        </el-avatar>
      </div>
      <div class="description">
        <h5>王正宏</h5>
        <p>apple1314520iphone@icloud.com</p>
      </div>
    </div>
  </div>
</template>

<script>
import {useLoginStore} from "@/store/login";
export default {
  name: "UserCard",
  props: {
    size: Number|String,
    logoutButton: Boolean
  },
  setup() {
    const loginStore = useLoginStore();
    return {
      loginStore
    }
  }
}
</script>

<style scoped>
  .user-card {
    padding: 12px 0;
  }
  .user-card .description {
    padding-left: 12px;
  }
  .user-card h5 {
    font-weight: 800;
    margin: 0;
  }
  .user-card p {
    margin: 0;
  }
  .user-card .avatar {
    cursor: pointer;
  }
</style>