<template>
  <div class="register-contain">
    <h3 class="text-dark mb-3">課程規劃</h3>
    <div class="container-fluid m-0 p-0">
      <div class="row">
        <div class="col-6">
          <span>學院</span>
          <el-select
            class="w-100 mt-2"
            placeholder="Select"
            size="large"
            v-model="accountStore.userData.college.id"
          >
            <el-option
              v-for="college in systemConfigStore.colleges"
              :key="college.id"
              :label="college.name_zh"
              :value="college.id"
            >
              <span style="float: left">{{ college.name_zh }}</span>
            </el-option>
          </el-select>
        </div>
        <div class="col-6">
          <span>科系</span>
          <el-select
            class="w-100 mt-2"
            placeholder="Select"
            size="large"
            v-model="accountStore.userData.department.id"
          >
            <el-option
              v-for="department in systemConfigStore.departments"
              :key="department.id"
              :label="department.name_zh"
              :value="department.id"
            >
              <span style="float: left">{{ department.name_zh }}</span>
            </el-option>
          </el-select>
        </div>
        <div class="col-12">
          <hr />
        </div>
        <div class="col-3">
          <div class="fbc">
            <span>最大選修學分</span>
            <div class="hint d-flex">
              <el-tooltip
                class="box-item"
                effect="dark"
                content="學校規定：上學期平均 GPA 達 3.38 以上者最多可選 31 學分，3.38 以下可選 25 學分"
                placement="top"
              >
                <el-icon color="#E6A23C">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </div>
          <el-input-number
            size="large"
            :min="16"
            :max="31"
            @change="() => {}"
            class="w-100 mt-2"
            v-model="courseStore.maximumCredits"
          />
        </div>
        <div class="col-3">
          <div class="fbc">
            <span>最大自動選課嘗試次數</span>
            <div class="hint d-flex">
              <el-tooltip
                class="box-item"
                effect="dark"
                content="設置課程自動選課的最大嘗試次數此參數以降低被校方偵測的機率"
                placement="top"
              >
                <el-icon color="#E6A23C">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </div>
          <el-input-number
            size="large"
            :min="1"
            :max="30"
            @change="() => {}"
            class="w-100 mt-2"
            v-model="maxTryNumber"
          />
        </div>
        <div class="col-6">
          <span>本學期選課時間</span>
          <el-date-picker
            size="large"
            class="w-100 mt-2"
            type="datetimerange"
            range-separator="To"
            start-placeholder="Start Time"
            end-placeholder="End Time"
            v-model="systemConfigStore.nextEvent.timeRange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useLoginStore } from "@/store/login";
import { storeToRefs } from "pinia";
import { defineComponent, toRaw } from "vue";
import { useSystemConfigStore } from "@/store/systemConfig";
import { useAccountStore } from "@/store/account";
import { useCourseStore } from "@/store/course/course";
import { useGlobalStore } from "@/store/global";

export default defineComponent({
  setup() {
    const loginStore = useLoginStore();
    const { fields } = storeToRefs(loginStore);
    const systemConfigStore = useSystemConfigStore();
    const accountStore = useAccountStore();
    const courseStore = useCourseStore();
    const globalStore = useGlobalStore();

    let maxCredits = courseStore.maximumCredits;
    let maxTryNumber = 10;
    return {
      loginStore,
      fields,
      systemConfigStore,
      accountStore,
      courseStore,
      maxCredits,
      maxTryNumber,
      globalStore,
    };
  },

  async created() {
    (document.activeElement as HTMLElement).blur();
    this.globalStore.enableLoading();
    await this.systemConfigStore.getNextEvent();
    await this.systemConfigStore.getDepartments();
    await this.courseStore.getMaximumCredits();
    this.globalStore.disableLoading();

    this.maxCredits = this.courseStore.maximumCredits;
  },
});
</script>
