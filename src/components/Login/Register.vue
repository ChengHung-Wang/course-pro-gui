<template>
  <el-dialog
    v-model="displayStatus.register"
    title="註冊"
    center
    align-center
    :width="1140"
  >
    <div class="register-model">
      <!--   menu   -->
      <div class="menu fcc">
        <div class="menu-inner">
          <el-steps direction="vertical" :active="registerSteps.now">
            <el-step v-for="el in registerSteps.items" :key="el" :title="el" />
          </el-steps>
        </div>
      </div>
      <div class="contain">
        <Rule v-if="registerSteps.now === 0" />
        <WritePersonalInfo v-if="registerSteps.now === 1" />
        <CoursePlan v-if="registerSteps.now === 2" />
        <CompletePersonalInfo v-if="registerSteps.now === 3" />
        <AccountSecurity v-if="registerSteps.now === 4" />
        <Config v-if="registerSteps.now === 5" />
        <Finish v-if="registerSteps.now === 6" />
        <!--   footer   -->
        <div class="footer fec">
          <div>
            <el-button
              type="primary"
              plain
              v-if="registerSteps.now < 1"
              @click="loginStore.register_cancel()"
            >
              取消
            </el-button>

            <!--  -->
            <!-- <el-button
              type="primary"
              plain
              v-if="registerSteps.now >= 1"
              @click="registerSteps.now--"
            >
              上一步
            </el-button> -->
            <!--  -->

            <el-button
              v-if="loginStore.registerSteps.now < 6"
              type="primary"
              :disabled="!fields.register.accept"
              @click="loginStore.register_next()"
            >
              下一步
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
// components
import Rule from "@/components/Login/Register/Rule.vue";
import WritePersonalInfo from "@/components/Login/Register/WritePersonalInfo.vue";
import CoursePlan from "@/components/Login/Register/CoursePlan.vue";
import CompletePersonalInfo from "@/components/Login/Register/CompletePersonalInfo.vue";
import AccountSecurity from "@/components/Login/Register/AccountSecurity.vue";
import Config from "@/components/Login/Register/Config.vue";
import Finish from "@/components/Login/Register/Finish.vue";

// store
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/store/login";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const loginStore = useLoginStore();
    const { displayStatus, fields, registerSteps } = storeToRefs(loginStore);
    return {
      displayStatus,
      fields,
      registerSteps,
      loginStore,
    };
  },
  components: {
    Rule,
    WritePersonalInfo,
    CoursePlan,
    CompletePersonalInfo,
    Config,
    AccountSecurity,
    Finish,
  },
  created() {
    // document.body.addEventListener('touchmove', function (e) {
    //   e.preventDefault();
    // }, {
    //   passive: false
    // });
  },
  methods: {
    async register() {},
  },
});
</script>

<style>
@import "/src/assets/css/register.css";
</style>
