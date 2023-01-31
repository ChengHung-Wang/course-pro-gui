<template>
  <div class="register-contain">
    <h3 class="text-dark mb-3">課程規劃</h3>
    <div class="container-fluid m-0 p-0">
      <div class="row">
        <div class="col-6">
          <span>學院</span>
          <el-select class="w-100 mt-2" placeholder="Select" size="large">
            <el-option key="1" label="item.label" value="item.value">
              <span style="float: left">資訊工程系</span>
              <span
                style="
                  float: right;
                  color: var(--el-text-color-secondary);
                  font-size: 12px;
                "
              >
                Department of Computer Science and Information Engineering
              </span>
            </el-option>
          </el-select>
        </div>
        <div class="col-6">
          <span>科系</span>
          <el-select class="w-100 mt-2" placeholder="Select" size="large">
            <el-option key="2" label="item.label" value="item.value">
              <span style="float: left">資訊工程系</span>
              <span
                style="
                  float: right;
                  color: var(--el-text-color-secondary);
                  font-size: 12px;
                "
              >
                Department of Computer Science and Information Engineering
              </span>
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
            @change=""
            class="w-100 mt-2"
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
            :min="16"
            :max="31"
            @change=""
            class="w-100 mt-2"
          />
        </div>
        <div class="col-6">
          <span>本學期選課時間</span>
          <el-date-picker
            :editable="false"
            size="large"
            class="w-100 mt-2"
            type="datetimerange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useLoginStore } from "@/store/login";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CoursePlan",
  setup() {
    const loginStore = useLoginStore();
    const { fields } = storeToRefs(useLoginStore());
    return {
      fields,
      loginStore,
    };
  },
  created() {
    document.activeElement.blur();
  },
});
</script>
