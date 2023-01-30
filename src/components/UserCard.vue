<template>
  <div class="user-card" v-if="accountStore.userData.name !== undefined">
    <div class="inner fsc">
      <div class="avatar">
        <el-popconfirm v-if="logoutButton" @confirm="loginStore.logout" title="登出系統?">
          <template #reference>
            <el-avatar
                class="avatar" shape="circle"
                :src="getAvatars()"
                :size="size === undefined ? 80 : parseInt(size)">
              <h3>{{ noAvatarText }}</h3>
            </el-avatar>
          </template>
        </el-popconfirm>
        <el-avatar
            v-if="!logoutButton"
            :src="getAvatars()"
            class="avatar" shape="circle"
            :size="size === undefined ? 80 : parseInt(size)">
          <h3>{{ noAvatarText }}</h3>
        </el-avatar>
      </div>
      <div class="description">
        <h5 v-bind:style="{fontSize: fontSize}">{{ accountStore.userData.name }}</h5>
        <p>{{ accountStore.userData.student_no }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useLoginStore } from "@/store/login";
import { useAccountStore } from "@/store/account";
import {toRaw} from "vue";

export default {
  name: "UserCard",
  props: {
    size: Number|String,
    fontSize: {
      type: String,
      default: "20px"
    },
    logoutButton: Boolean,
    noAvatarText: {
      type: String,
      default: "?"
    }
  },
  setup() {
    const loginStore = useLoginStore();
    const accountStore = useAccountStore();
    return {
      loginStore,
      accountStore,
    }
  },
  async mounted() {
    if (this.accountStore.userData.name === undefined)
    {
      await this.accountStore.getAccountInfo();
      console.log(toRaw(this.accountStore.userData));

    }
  },
  methods: {
    getAvatars() {
      if (toRaw(this.accountStore.userData).avatars.length <= 0) return "";
      const avatars = toRaw(this.accountStore.userData).avatars;
      return avatars[avatars.length - 1].avatar;
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