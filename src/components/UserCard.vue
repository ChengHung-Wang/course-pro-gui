<script setup lang="ts">
import { useLoginStore } from "@/store/login";
import { useAccountStore } from "@/store/account";
import { ref } from "vue";
import { storeToRefs } from "pinia";

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
const { userData: user } = storeToRefs(accountStore);

const getAvatars = () => {
  if (!user.value!.avatars) return;
  if (user.value!.avatars.length <= 0) return;

  const avatars = user.value!.avatars;
  avatarURL.value = avatars[avatars.length - 1].avatar;
};

if (!user.value) {
  await accountStore.getAccountInfo();
}
getAvatars();
</script>

<template>
  <div class="user-card" v-if="user!.name !== undefined">
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
              :src="avatarURL"
              :size="size && 80"
            >
              <h3 class="m-0">{{ noAvatarText }}</h3>
            </el-avatar>
          </template>
        </el-popconfirm>
        <el-avatar
          v-if="!logoutButton"
          :src="avatarURL"
          class="avatar fcc"
          shape="circle"
          :size="size && 80"
        >
          <h3 class="m-0">{{ noAvatarText }}</h3>
        </el-avatar>
      </div>
      <div class="description">
        <h5 v-bind:style="{ fontSize: props.fontSize }">
          {{ user!.name }}
        </h5>
        <p>{{ user!.student_no }}</p>
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
