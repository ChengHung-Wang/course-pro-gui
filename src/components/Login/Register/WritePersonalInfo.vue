<template>
  <div class="register-contain">
    <el-form
      label-position="top"
      label-width="100px"
      ref="registerForm"
      :model="fields.register"
      :rules="registerFormRule"
    >
      <h3 class="text-dark">填寫個人信息</h3>
      <p>這些資訊將會用於驗證您的身份、日後訪問您的個人檔案用</p>
      <hr />
      <div class="container-fluid mt-4 p-0">
        <div class="row">
          <div class="col-6">
            <h5 class="text-dark mb-3">
              適用於 <Logo class="logo" :color="'#303333'" /> 的信息
            </h5>
            <div class="container-fluid m-0 p-0">
              <div class="row">
                <el-form-item
                  prop="email"
                  class="col-12"
                  label="常用信箱(不可為 @mail.ntust.edu.tw 結尾的信箱）"
                >
                  <el-input
                    type="email"
                    size="large"
                    v-model="fields.register.email"
                  />
                </el-form-item>
                <el-form-item prop="password" class="col-12" label="密碼">
                  <el-input
                    type="password"
                    size="large"
                    v-model="fields.register.password"
                  />
                </el-form-item>
                <el-form-item
                  prop="re_password"
                  class="col-12"
                  label="重複輸入密碼"
                >
                  <el-input
                    type="password"
                    size="large"
                    v-model="fields.register.re_password"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="col-6">
            <h5 class="text-dark mb-3">適用於臺灣科技大學系統端的信息</h5>
            <div class="container-fluid m-0 p-0">
              <div class="row">
                <el-form-item prop="student_no" class="col-12" label="學號">
                  <el-input
                    type="email"
                    size="large"
                    placeholder="BXXXXXXXX"
                    v-model="fields.register.student_no"
                  />
                </el-form-item>
                <el-form-item
                  prop="ntust_email_password"
                  class="col-12"
                  label="Email 密碼 (用於發送通知)"
                >
                  <el-input
                    type="password"
                    size="large"
                    v-model="fields.register.ntust_email_password"
                  />
                </el-form-item>
                <el-form-item
                  prop="ntust_sso_password"
                  class="col-12 fsc"
                  label="SSO 密碼"
                >
                  <el-input
                    type="password"
                    size="large"
                    v-model="fields.register.ntust_sso_password"
                  />
                </el-form-item>
              </div>
            </div>
            <span>
              注意：您的 <strong>Email 密碼</strong> 應該要能夠在
              <el-link
                icon="link"
                style="margin-top: -2.5px"
                class="text-primary"
                target="_blank"
                href="https://mail.ntust.edu.tw/"
              >
                這個連結
              </el-link>
              登入並且<br />
              您的 <strong> SSO 密碼 </strong> 應該要能夠在
              <el-link
                icon="link"
                style="margin-top: -2.5px"
                class="text-primary"
                target="_blank"
                href="https://stuinfosys.ntust.edu.tw/NTUSTSSOServ/SSO/Login/CourseSelection"
              >
                這個連結
              </el-link>
              登入才能完成註冊。
            </span>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useLoginStore } from "@/store/login";
import { storeToRefs } from "pinia";
import Logo from "@/components/Logo.vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const loginStore = useLoginStore();
    const { fields, registerFormRule } = storeToRefs(loginStore);
    return {
      fields,
      loginStore,
      registerFormRule,
    };
  },
  components: {
    Logo,
  },
});
</script>

<style scoped>
.logo {
  width: 100px;
  height: 20px;
}
.col-6:first-child {
  border-right: 0.1px rgba(0, 0, 0, 0.3) solid;
}
</style>
