<template>
  <div id="home">
    <div class="inner fcc h-100">
      <div class="container">
        <div class="row w-100">
          <div class="col-6">
            <Suspense>
              <UserCard :logout-button="true" :size="60" />
            </Suspense>
          </div>
          <RadarWeight />
        </div>
        <div class="row w-100">
          <div class="col-12 home-apps">
            <AppItem
              v-for="item in homeStore.apps"
              :key="item.name"
              @click="item.click"
              :icon="item.icon"
              :app-name="item.displayName"
            />
          </div>
        </div>
      </div>
    </div>
    <footer>
      <Logo color="#505555" class="logo" />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useGlobalStore } from "@/store/global";
import { useHomeStore } from "@/store/home/home";
// components
import UserCard from "@/components/UserCard.vue";
import Logo from "@/components/Logo.vue";
import AppItem from "@/components/Home/AppItem.vue";
import RadarWeight from "@/components/Home/RadarWeight.vue";

export default defineComponent({
  setup() {
    const homeStore = useHomeStore();
    const globalStore = useGlobalStore();
    globalStore.checkLogin();
    return {
      homeStore,
      globalStore,
    };
  },
  created() {
    this.globalStore.disableLoading();
  },
  components: {
    UserCard,
    Logo,
    AppItem,
    RadarWeight,
  },
});
</script>

<style>
@import "/src/assets/css/home.css";
</style>
