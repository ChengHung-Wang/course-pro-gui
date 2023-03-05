<template>
  <div id="login-footer">
    <div class="logos">
      <img
        @click="open('https://www.figma.com/file/3Uy156OSTesry8QePbLdfG')"
        src="/src/assets/icons/figma-wh.svg"
        class="logo"
        alt=""
      />
      <img
        @click="open('https://github.com/ChengHung-Wang/course-pro-gui')"
        src="/src/assets/icons/github.svg"
        class="logo"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    open(href) {
      window.open(href);
    },
  },
};
</script>

<style scoped>
#login-footer {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}
.logo {
  height: 32px;
  cursor: pointer;
  margin: 12px;
}
</style>
