<template>
  <div id="login">
    <LoginForm v-if="displayStatus.login" />
    <Register />
  </div>
</template>

<script lang="ts">
// components
import LoginForm from "@/components/Login/LoginForm.vue";
import Register from "@/components/Login/Register.vue";
// store
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/store/login";

export default {
  data() {
  },
  setup() {
    const loginStore = useLoginStore();
    const { displayStatus } = storeToRefs(loginStore);
    return {
      loginStore,
      displayStatus,
    };
  },
  components: {
    LoginForm,
    Register,
  },
  created() {
    console.log(import.meta.env.VITE_API_END_POINT);
  }
};
</script>

<style scoped>
#login {
  width: 100vw;
  height: calc(var(--vh) * 100);
  background-image: url("../assets/login_banner_korean_girl_study_2x.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}
#login::after {
  content: "";
  width: 100vw;
  height: calc(var(--vh) * 100);
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  z-index: 1;
}
</style>
