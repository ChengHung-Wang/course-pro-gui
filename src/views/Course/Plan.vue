<template>
  <div class="component-padding fcc">
    <div class="container m-0">
      <div class="row">
        <div class="col-12 mt-5">
          <h2>課程規劃</h2>
        </div>
        <div class="col-12">
          <h4>選課</h4>
          <p>
            對不起各位我知道這很醜很破🥺<br />
            請給我點時間將它完成。
          </p>
        </div>
        <div class="col-2 mt-3">
          <el-select
            size="large"
            v-model="searchKey"
            placeholder="Select"
            class="w-100"
          >
            <el-option label="課程名稱" value="CourseName" />
            <el-option label="教師" value="CourseTeacher" />
            <el-option label="課程序號" value="CourseNo" />
          </el-select>
        </div>
        <div class="col-10 mt-3">
          <el-select
            size="large"
            v-model="selected"
            class="w-100"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="Please enter a keyword"
            remote-show-suffix
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span
                style="
                  float: right;
                  color: var(--el-text-color-secondary);
                  font-size: 13px;
                  margin-right: 6px;
                "
              >
                {{ item.value }}
              </span>
            </el-option>
          </el-select>
        </div>
        <div class="col-12 mt-3">
          <el-button
            class="w-100"
            size="large"
            type="primary"
            plain
            @click="pushTarget"
            >加入選課清單</el-button
          >
        </div>
      </div>
    </div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-12">
          <el-table :data="courseStore.targets" style="width: 100%">
            <el-table-column
              prop="course.serial"
              label="課程序號"
              width="120"
            />
            <el-table-column
              prop="course.name_zh"
              label="課程名稱"
              width="240"
            />
            <el-table-column
              prop="course.teacher.name_zh"
              label="授課教師"
              width="150"
            />
            <el-table-column prop="course.points" label="學分" width="60" />
            <el-table-column
              prop="course.hold_on"
              label="上課時間"
              width="120"
            />
            <el-table-column prop="status" label="狀態" />
            <el-table-column prop="tried" label="嘗試次數" />
            <el-table-column
              class-name="target-operate"
              fixed="right"
              label="操作"
              width="180"
            >
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  size="small"
                  :icon="Search"
                  @click="ElMessage('開發中...')"
                  >Detail</el-button
                >
                <el-button
                  link
                  type="danger"
                  size="small"
                  :icon="Delete"
                  @click="delTarget(scope.row.course_id)"
                  >Delete</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, toRaw } from "vue";
import { useCourseStore } from "@/store/course/course";
import { ElMessage, ElMessageBox } from "element-plus";
import { useGlobalStore } from "@/store/global";
import { Delete, Search } from "@element-plus/icons-vue";

interface ListItem {
  value: number;
  label: string;
}

let selected = ref<number[]>([]);
const options = ref<ListItem[]>([]);
const searchKey = ref("CourseName");
const loading = ref(false);
const courseStore = useCourseStore();

onMounted(async () => {
  courseStore.menu.active = 1;
  if (courseStore.targets.length < 1) {
    useGlobalStore().enableLoading();
    await courseStore.getTarget();
    useGlobalStore().disableLoading();
  }
});

const remoteMethod = async (query: string) => {
  if (query) {
    loading.value = true;
    // TODO: clean up hard code
    await courseStore
      .searchCourse("1112", query, toRaw(searchKey).value)
      .then((res) => {
        loading.value = false;
        if (res.status != 200) {
          ElMessage({
            message: "Search Error, Http status code: " + String(res.status),
            showClose: true,
            type: "error",
          });
          return;
        }
        options.value = res.res.data.map((el: any) => {
          return {
            label: `${el.serial} - ${el.name_zh} - ${
              el.original.CourseTeacher
            } (${el.hold_on.join(", ")})`,
            value: parseInt(el.id),
          };
        });
      });
  } else {
    options.value = [];
  }
};

const pushTarget = async () => {
  useGlobalStore().enableLoading();
  let success = <number[]>[];
  for (const courseID of toRaw(selected).value) {
    const res = await courseStore.pushTarget(courseID);
    if (res.status != 200) {
      ElMessage({
        type: "error",
        showClose: true,
        message: `courseID: ${courseID} 檢測到問題：${res.res.message}`,
      });
    } else {
      success.push(courseID);
    }
  }
  // selected = ref(toRaw(selected).value.filter(e => {
  //   return !success.includes(e);
  // }));
  useGlobalStore().disableLoading();
};

const delTarget = async (courseID: number) => {
  useGlobalStore().enableLoading();
  const result = await courseStore.delTarget(courseID);
  if (result.status == 200) {
    courseStore.targets = result.res.data;
  } else {
    await ElMessageBox.confirm(
      result.res.data.reason,
      `Error: ${result.status}`,
      {
        type: "error",
        showClose: false,
        showConfirmButton: false,
        showCancelButton: false,
      }
    );
  }
  useGlobalStore().disableLoading();
};
</script>
