<template>
  <div class="component-root">
    <div class="container">
      <div class="row fec">
        <div class="col-8 sub-title">
          <h2 class="text-white">選你所愛，讀你所願。</h2>
          <Logo class="logo" :color="'#FFFFFF'" />
          <span>&nbsp;&nbsp;for NTUST</span>
        </div>
        <div class="col-4">
          <div class="small-form" @keyup.enter="login()">
            <div class="inner-form">
              <h1 class="title mb-3 text-dark">登入系統</h1>
              <el-form label-position="top" label-width="100px">
                <el-form-item label="電子信箱">
                  <el-input
                    type="email"
                    size="large"
                    v-model="fields.login.account"
                  />
                </el-form-item>
                <el-form-item label="密碼">
                  <el-input
                    type="password"
                    size="large"
                    v-model="fields.login.password"
                  />
                </el-form-item>
                <el-button
                  @click="login()"
                  size="large"
                  class="w-100 mt-1"
                  type="primary"
                  :loading="submitDisable"
                  >登入</el-button
                >
              </el-form>
              <div class="fcc mt-3">
                <div>
                  <el-link
                    href="#"
                    type="primary"
                    @click="displayStatus.register = true"
                    >註冊帳戶</el-link
                  >
                  <span class="text-primary m-2">|</span>
                  <el-link
                    href="#"
                    type="primary"
                    @click="displayStatus.forget = true"
                    >忘記密碼</el-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import Logo from "@/components/Logo.vue";
import Footer from "@/components/Login/Footer.vue";

// store
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/store/login";
import { useGlobalStore } from "@/store/global";

export default {
  setup() {
    const loginStore = useLoginStore();
    const { displayStatus, fields } = storeToRefs(loginStore);
    const submitDisable = false;
    const globalStore = useGlobalStore();
    return {
      displayStatus,
      fields,
      loginStore,
      submitDisable,
      globalStore,
    };
  },
  methods: {
    async login() {
      this.submitDisable = true;
      this.globalStore.enableLoading();
      if (
        await this.loginStore.login(
          this.fields.login.account,
          this.fields.login.password
        )
      ) {
        this.globalStore.disableLoading();
        this.$router.push("/");
      } else {
        this.globalStore.disableLoading();
        ElMessage({
          showClose: true,
          message:
            "登入失敗，請注意你的電子信箱不應是 @mail.ntust.edu.tw的信箱",
          type: "error",
        });
        this.submitDisable = false;
      }
    },
  },
  components: {
    Logo,
    Footer,
  },
};
</script>

<style scoped>
@import "/src/assets/css/login.css";
</style>
