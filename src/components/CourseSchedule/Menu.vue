<template>
  <div id="menu">
    <router-link to="/" class="back-home">
      <el-icon><Back /></el-icon>
      <span>Home</span>
    </router-link>
    <div class="w-100 app-info fcc">
      <img class="app-icon" :src="getAppInfo().icon" alt="">
      <h5 class="app-name">{{ getAppInfo().displayName }}</h5>
    </div>
    <div class="nav-items">
      <div class="nav-item"
           @click="item.click"
           v-bind:class="{'nav-item-active': key === menu.active}"
           v-for="(item, key) in menu.items" :key="key">
        <div v-html="item.icon" class="nav-item-icon"></div>
        <span class="nav-item-text">{{ item.displayName }}</span>
      </div>
    </div>
    <UserCard :logout-button="true" :size="50" font-size="16px" />
  </div>
</template>

<script>
import {useHomeStore} from "@/store/home";
import UserCard from "@/components/UserCard";
export default {
  name: "Menu",
  setup() {
    const homeStore = useHomeStore();
    return {
      homeStore,
    }
  },
  methods: {
    getAppInfo() {
      return this.homeStore.apps[this.appId];
    }
  },
  components: {
    UserCard
  },
  props: {
    appId: Number,
    menu: {
      type: Object,
      default: {}
    }
  },
  created() {
  }
}
</script>

<style scoped>
@import "/src/assets/css/menu.css";

</style>