<template>
  <el-dialog v-model="blabla" title="Shipping address">

  </el-dialog>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      blabla: true
    }
  },
  props: {
    status: String
  },
  created() {
    console.log(this.status);
  }
}
</script>

<style scoped>

</style>