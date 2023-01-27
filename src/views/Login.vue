<template>
  <div id="login">
    <LoginForm />
    <Register />
  </div>
</template>

<script>
import LoginForm from "@/components/Login/LoginForm";
import Register from "@/components/Login/Register";
export default {
  name: "Login",
  data() {
    return {
      status: [
          "login",
          "register",
          "forget"
      ],
      status_id: 0
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