<template>
  <div class="register-contain">
    <h3 class="text-dark">填寫個人信息</h3>
    <p>這些資訊將會用於驗證您的身份、日後訪問您的個人檔案用</p>
    <hr>
    <div class="container-fluid mt-4 p-0">
      <div class="row">
        <div class="col-6">
          <h5 class="text-dark mb-3">適用於 <Logo class="logo" :color="'#303333'" /> 的信息</h5>
          <el-form label-position="top" label-width="100px">
            <div class="container-fluid m-0 p-0">
              <div class="row">
                <el-form-item class="col-12" label="常用信箱(不可為 @mail.ntust.edu.tw 結尾的信箱）">
                  <el-input type="email" size="large" v-model="fields.register.account" />
                </el-form-item>
                <el-form-item class="col-12" label="密碼">
                  <el-input type="password" size="large" v-model="fields.register.password" />
                </el-form-item>
                <el-form-item class="col-12" label="重複輸入密碼">
                  <el-input type="password" size="large" v-model="fields.register.password" />
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <div class="col-6">
          <h5 class="text-dark mb-3">適用於臺灣科技大學系統端的信息</h5>
          <el-form label-position="top" label-width="100px">
            <div class="container-fluid m-0 p-0">
              <div class="row">
                <el-form-item class="col-12" label="學號">
                  <el-input type="email" size="large" v-model="fields.register.student_no" />
                </el-form-item>
                <el-form-item class="col-12" label="Email 密碼 (用於發送通知)">
                  <el-input type="password" size="large" v-model="fields.register.ntust_email_password" />
                </el-form-item>
                <el-form-item class="col-12" label="SSO 密碼">
                  <el-input type="password" size="large" v-model="fields.register.ntust_sso_password" />
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useLoginStore} from "@/store/login";
import {storeToRefs} from "pinia";
import Logo from "@/components/Logo";
export default {
  name: "WritePersonalInfo",
  setup() {
    const loginStore = useLoginStore();
    const { fields } = storeToRefs(useLoginStore());
    return {
      fields,
      loginStore
    }
  },
  components: {
    Logo
  }
}
</script>

<style scoped>
  .logo {
    width: 100px;
    height: 20px;
  }
  .col-6:first-child {
    border-right: .1px rgba(0, 0, 0, .3) solid;
  }
</style>