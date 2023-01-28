<template>
  <div class="register-contain">
    <h3 class="text-dark">帳戶安全</h3>
    <span>
      當你忘記密碼時，這些問題可以幫助你找回帳戶。<br>
      這些問題只有你能知道。
    </span>
    <div class="container-fluid m-0 p-0">
      <div class="row mt-4">
        <div class="col-6">
          <p>你大學認識的第一位老師/教授是誰？</p>
          <el-input size="large" class="w-100"></el-input>
        </div>
        <div class="col-6">
          <p>你在大學結交的知音是誰？</p>
          <el-input size="large" class="w-100"></el-input>
        </div>
        <div class="col-6 mt-3">
          <p>台科學餐最不好吃的攤位</p>
          <el-input size="large" class="w-100"></el-input>
        </div>
        <div class="col-6 mt-3">
          <p>你絕對不會想修哪位老師的課？</p>
          <el-input size="large" class="w-100"></el-input>
        </div>
        <div class="col-6 mt-3">
          <p>第一個參加的社團</p>
          <el-input size="large" class="w-100"></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "AccountSecurity"
})
</script>

<style scoped>

</style>