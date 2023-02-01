<template>
  <div class="register-contain">
    <h3 class="text-dark">使用條款</h3>
    <div class="box mt-3">
      <p>
        歡迎使用 course pro for NTUST
        平台，為了確保您與本平台的使用體驗與權益，向您說明本網站的隱私權保護政策，以保障您的權益，請您詳閱下列內容：
        <br />
        以下 course pro for NTUST 簡稱本網站。
      </p>
      <h6 class="text-dark">一、隱私權保護政策的適用範圍</h6>
      <p>
        隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。<br />
        隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。
      </p>

      <h6 class="text-dark">二、個人資料蒐集</h6>
      <p>
        當您造訪本網站或使用本網站所提供之功能服務時，我們將視該服務功能的必要性，請您提供必要的個人資料，
        並在該特定目的範圍內處理及利用您的個人資料；非經您書面同意，本網站不會將個人資料用於其他用途。
      </p>

      <h6 class="text-dark">三、網站對外的相關連結</h6>
      <p>
        當您造訪本網站或使用本網站所提供之功能服務時，我們將視該服務功能的必要性，請您提供必要的個人資料，<br />
        並在該特定目的範圍內處理及利用您的個人資料；非經您書面同意，本網站不會將個人資料用於其他用途。
      </p>

      <h6 class="text-dark">四、第三方資料獲取權</h6>
      <p>
        本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。<br />
        前項但書之情形包括不限於：
      </p>
      <ul>
        <li>經由您書面同意。</li>
        <li>法律明文規定。</li>
        <li>為免除您生命、身體、自由或財產上之危險。</li>
        <li>
          與公務機關或學術研究機構合作，基於公共利益為統計或學術研究而有必要，且資料經過提供者處理或蒐集著依其揭露方式無從識別特定之當事人。
        </li>
        <li>
          當您在網站的行為，違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害時，經網站管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。
        </li>
        <li>有利於您的權益。</li>
        <li>
          本網站委託廠商協助蒐集、處理或利用您的個人資料時，將對委外廠商或個人善盡監督管理之責。
        </li>
      </ul>
    </div>
    <div class="w-100 mt-3">
      <el-checkbox v-model="fields.register.accept">
        <span class="text-dark">我已經清楚地閱讀並</span>
        <strong class="text-primary"
          >同意隱私切結書&利用告知事項聲明暨同意書</strong
        >
      </el-checkbox>
    </div>
  </div>
</template>

<script lang="ts">
import { useLoginStore } from "@/store/login";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Rule",
  setup() {
    const loginStore = useLoginStore();
    const { fields } = storeToRefs(useLoginStore());
    return {
      fields,
      loginStore,
    };
  },
});
</script>

<style scoped>
.box {
  border: 0.2px rgba(0, 0, 0, 0.3) solid;
  border-radius: 6px;
  width: 100%;
  height: calc(100% - 150px);
  padding: 12px;
  overflow: auto;
}
</style>
