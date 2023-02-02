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
              <p>{{ accountStore.userData.college.name_zh }}</p>
            </div>
            <div class="w-50">
              <h6>科系</h6>
              <p>{{ accountStore.userData.department.name_zh }}</p>
            </div>
            <div class="w-50">
              <h6>生日</h6>
              <p>{{ accountStore.userData.birthday }}</p>
            </div>
            <div class="w-50">
              <h6>手機</h6>
              <p>{{ accountStore.userData.mobile_phone }}</p>
            </div>
            <div class="w-50">
              <h6>性別</h6>
              <p>{{ accountStore.userData.sex }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useLoginStore } from "@/store/login";
import { storeToRefs } from "pinia";
import UserCard from "@/components/UserCard.vue";
import { defineComponent } from "vue";
import { useAccountStore } from "@/store/account";

export default defineComponent({
  setup() {
    const loginStore = useLoginStore();
    const accountStore = useAccountStore();
    const { fields } = storeToRefs(loginStore);
    return {
      fields,
      loginStore,
      accountStore,
    };
  },
  components: {
    UserCard,
  },
});
</script>

<style scoped>
.col-6:first-child {
  border-right: 0.2px rgba(0, 0, 0, 0.3) solid;
}
</style>
