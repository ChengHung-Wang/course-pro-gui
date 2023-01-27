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
          <div class="small-form">
            <div class="inner-form">
              <h1 class="title mb-3 text-dark">登入系統</h1>
              <el-form
                  label-position="top"
                  label-width="100px"
                  :model="formData">
                <el-form-item label="電子信箱">
                  <el-input size="large" v-model="formData.account" />
                </el-form-item>
                <el-form-item label="密碼">
                  <el-input type="password" size="large" v-model="formData.password" />
                </el-form-item>
                <el-button size="large" class="w-100 mt-3" type="primary">登入</el-button>
              </el-form>
              <div class="fcc mt-3">
                <div>
                  <el-link href="#" type="primary" @click="status_id=1">註冊帳戶</el-link>
                  <span class="text-primary m-2">|</span>
                  <el-link href="#" type="primary">忘記密碼</el-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/Logo";
export default {
  name: "LoginForm",
  data() {
    return {
      formData: {
        account: "",
        password: ""
      }
    }
  },
  components: {
    Logo
  }
}
</script>

<style scoped>
  .title {
    font-size: 30px;
  }
  .component-root {
    position: absolute;
    width: 100vw;
    height: 100%;
    z-index: 2;
    inset: 0;
    display: flex;
    align-items: center;
  }
  .small-form {
    background: white;
    min-width: 355px;
    height: 65vh;
    max-height: 550px;
    border-radius: 24px;
    padding: 24px;
    display: flex;
    align-items: center;
  }
  .inner-form {
    width: 100%;
  }
  .sub-title {
    color: white;
  }
  .sub-title h2 {
    font-weight: 800;
    font-size: 40px;
  }
  .sub-title .logo {
    width: 180px;
  }
</style>