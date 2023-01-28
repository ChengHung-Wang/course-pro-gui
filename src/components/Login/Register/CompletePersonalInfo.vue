<template>
  <div class="register-contain">
    <h3 class="text-dark">完善個人信息</h3>
    <p>點擊「＋」來上傳一張照片更換頭像</p>

    <div class="container-fluid m-0 p-0">
      <div class="row">
        <div class="col-6">
          <UserCard></UserCard>
        </div>
        <div class="col-6">
          <div class="fsc">
            <div class="w-50">
              <h6>學院</h6>
              <p>電資學院</p>
            </div>
            <div class="w-50">
              <h6>科系</h6>
              <p>資訊工程系</p>
            </div>
            <div class="w-50">
              <h6>生日</h6>
              <p>2002-04-08</p>
            </div>
            <div class="w-50">
              <h6>手機</h6>
              <p>0912-345-678</p>
            </div>
            <div class="w-50">
              <h6>性別</h6>
              <p>男</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useLoginStore} from "@/store/login";
import {storeToRefs} from "pinia";
import UserCard from "@/components/UserCard";
import {defineComponent} from "vue";

export default defineComponent({
  name: "CompletePersonalInfo",
  setup() {
    const loginStore = useLoginStore();
    const { fields } = storeToRefs(useLoginStore());
    return {
      fields,
      loginStore
    }
  },
  components: {
    UserCard
  }
})
</script>
<style scoped>
  .col-6:first-child {
    border-right: .2px rgba(0, 0, 0, .3) solid;
  }
</style>