<template>
  <div class="col-xxl-3 col-lg-6 col-xl-4 mb-5">
    <div class="card">
      <img class="icon" :src="icon" alt="">
      <div class="card-container">
        <div class="left w-100 h-100">
            <div class="item-container">
              <el-scrollbar max-height="125px">
                <div v-for="item in 12" class="el-alert el-alert--info is-light">
                  <div class="el-alert__content"><span class="el-alert__title" style="cursor: default;">Course Name</span>
                    <div class="el-alert__close-btn">Credit</div>
                  </div>
                </div>
              </el-scrollbar>
            </div>
        </div>
        <div class="right" v-bind:style="{color: color}">
          <div class="top">
            <div class="title">{{ title }}</div>
            <div class="sub-title">{{ subTitle }}</div>
          </div>
          <div class="bottom">
            <div class="num">{{ num }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    icon: String,
    num: String|Number,
    title: String,
    subTitle: String,
    color: String
  }
}
</script>

<style scoped>
.card {
  height: 180px;
  box-shadow: var(--normal-shadow);
  border: unset;
  margin: 0;
  padding: 0 15px;
}
.card> .icon {
  width: 60px;
  position: absolute;
  left: 12px;
  top: -12px;
}
.card-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: end;
  justify-content: space-between;
}
.left .item-container {
  width: calc(100% - 92px);
  position: absolute;
  bottom: 0;
}
.left .el-alert {
  padding: 8px;
  margin: 6px 0;
}
.card .right {
  text-align: right;
  width: 80px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-content: space-between;
}
.card .right .top {
  margin-top: 12px;
}
.card .right .title {
  font-weight: 800;
  font-size: 24px;
}
.card .right .sub-title {
  font-size: 13px;
}
.card .right .num {
  font-size: 40px;
}
</style>
