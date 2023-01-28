<template>
  <div id="login">
    <LoginForm v-if="displayStatus.login" />
    <Register />
  </div>
</template>

<script>
// components
import LoginForm from "@/components/Login/LoginForm";
import Register from "@/components/Login/Register";
// store
import { storeToRefs } from 'pinia'
import { useLoginStore } from "@/store/login";

export default {
  name: "Login",
  setup() {
    const loginStore = useLoginStore();
    const { displayStatus } = storeToRefs(useLoginStore());
    return {
      loginStore,
      displayStatus
    }
  },
  async created() {
  },
  data() {
    return {
    }
  },
  components: {
    LoginForm,
    Register
  }
}
</script>

<style scoped>
  #login {
    width: 100vw;
    height: 100vh;
    background-image: url('../assets/login_banner_korean_girl_study_2x.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
  }
  #login::after {
    content: '';
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 1;
  }
</style>