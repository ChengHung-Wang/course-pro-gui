<template>
  <el-dialog v-model="displayStatus.register" title="註冊" center align-center :width="1140">
    <div class="register-model">
      <!--   menu   -->
      <div class="menu fcc">
        <div class="menu-inner">
          <el-steps direction="vertical" :active="registerSteps.now">
            <el-step v-for="el in registerSteps.items" :title="el"/>
          </el-steps>
        </div>
      </div>
      <div class="contain">
        <Rule v-if="registerSteps.now === 0"/>
        <WritePersonalInfo v-if="registerSteps.now === 1"/>
        <CoursePlan v-if="registerSteps.now === 2"/>
        <CompletePersonalInfo v-if="registerSteps.now === 3"/>
        <Config v-if="registerSteps.now === 4"/>
        <Finish v-if="registerSteps.now === 5"/>
        <!--   footer   -->
        <div class="footer fec">
          <div>
            <el-button type="primary" plain v-if="registerSteps.now < 1" @click="displayStatus.register=false">
              取消
            </el-button>
            <el-button type="primary" plain v-if="registerSteps.now >= 1" @click="registerSteps.now --">
              上一步
            </el-button>
            <el-button type="primary" :disabled="!fields.register.accept" @click="registerSteps.now ++">
              下一步
            </el-button>
          </div>
        </div>
      </div>

    </div>
  </el-dialog>
</template>

<script>
// components
import Rule from "@/components/Login/Register/Rule";
import WritePersonalInfo from "@/components/Login/Register/WritePersonalInfo";
import CoursePlan from "@/components/Login/Register/CoursePlan";
import CompletePersonalInfo from "@/components/Login/Register/CompletePersonalInfo";
import Config from "@/components/Login/Register/Config";
import Finish from "@/components/Login/Register/Finish";

// store
import {storeToRefs} from 'pinia'
import {useLoginStore} from "@/store/login";

export default {
  name: "Register",
  data() {
    return {}
  },
  setup() {
    const {displayStatus, fields, registerSteps} = storeToRefs(useLoginStore());
    return {
      displayStatus,
      fields,
      registerSteps
    }
  },
  components: {
    Rule,
    WritePersonalInfo,
    CoursePlan,
    CompletePersonalInfo,
    Config,
    Finish
  },
  created() {
    // document.body.addEventListener('touchmove', function (e) {
    //   e.preventDefault();
    // }, {
    //   passive: false
    // });
  }
}
</script>

<style>
@import "/src/assets/css/register.css";
</style>