<template>
  <div id="home">
    <div class="inner fcc h-100">
      <div class="container">
        <div class="row w-100">
          <div class="col-6">
            <UserCard :logout-button="true" :size="60" />
          </div>
          <div class="weight-count col-6 fec">
            <h1 class="text-dark w-100">0000,000</h1>
            <p class="m-0">1234</p>
          </div>
        </div>
        <div class="row w-100">
          <div class="col-12 home-apps">
            <AppItem
              v-for="item in homeStore.apps"
              @click="item.click"
              :icon="item.icon"
              :app-name="item.displayName"
            />
          </div>
        </div>
      </div>
    </div>
    <footer>
      <Logo color="#303333" class="logo" />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useGlobalStore } from "@/store/global";
import { useHomeStore } from "@/store/home";
// components
import UserCard from "@/components/UserCard.vue";
import Logo from "@/components/Logo.vue";
import AppItem from "@/components/Home/AppItem.vue";

export default defineComponent({
  name: "HomeView",
  setup() {
    const homeStore = useHomeStore();
    const globalStore = useGlobalStore();
    globalStore.checkLogin();
    return {
      homeStore,
      globalStore,
    };
  },
  created() {},
  components: {
    UserCard,
    Logo,
    AppItem,
  },
});
</script>

<style scoped>
@import "/src/assets/css/home.css";
</style>
