<script setup lang="ts">
import { useLoginStore } from "@/store/login";
import { useAccountStore } from "@/store/account";
import { toRaw, onMounted, ref, watch } from "vue";
import { computePosition } from "@floating-ui/core";

interface Props {
  size?: number;
  fontSize?: string;
  logoutButton?: boolean;
  noAvatarText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  fontSize: "20px",
  noAvatarText: "?",
});

const loginStore = useLoginStore();
const accountStore = useAccountStore();
let avatarURL = ref("");

onMounted(async () => {
  if (accountStore.userData.name === undefined) {
    await accountStore.getAccountInfo();
  }
  getAvatars();
});

const getAvatars = () => {
  if (toRaw(accountStore.userData).avatars.length <= 0) return "";
  const avatars = toRaw(accountStore.userData).avatars;
  avatarURL.value = ref(avatars[avatars.length - 1].avatar);
  return avatars[avatars.length - 1].avatar;
};

watch(accountStore.userData, () => {
  getAvatars();
});
</script>

<template>
  <div class="user-card" v-if="accountStore.userData.name !== undefined">
    <div class="inner fsc">
      <div class="avatar">
        <el-popconfirm
          v-if="logoutButton"
          @confirm="loginStore.logout"
          title="登出系統?"
        >
          <template #reference>
            <el-avatar
              class="avatar"
              shape="circle"
              :src="avatarURL.value"
              :size="size === undefined ? 80 : size"
            >
              <h3 class="m-0">{{ noAvatarText }}</h3>
            </el-avatar>
          </template>
        </el-popconfirm>
        <el-avatar
          v-if="!logoutButton"
          :src="avatarURL.value"
          class="avatar fcc"
          shape="circle"
          :size="size === undefined ? 80 : size"
        >
          <h3 class="m-0">{{ noAvatarText }}</h3>
        </el-avatar>
      </div>
      <div class="description">
        <h5 v-bind:style="{ fontSize: props.fontSize }">
          {{ accountStore.userData.name }}
        </h5>
        <p>{{ accountStore.userData.student_no }}</p>
      </div>
    </div>
  </div>
</template>

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
