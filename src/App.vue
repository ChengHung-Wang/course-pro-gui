<template>
<!--  <nav>-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </nav>-->
<!--  <CourseSchedule></CourseSchedule>-->
  <router-view/>
</template>

<style>
  body {
    padding: 0;
    margin: 0;
  }
</style>

<script>
  import { useLoginStore } from "@/store/login";

  export default {
    setup() {
      const loginStore = useLoginStore();
      return {
        loginStore
      }
    },
    created() {
      // var config = {
      //   method: 'get',
      //   url: 'http://127.0.0.1:8000/api/v2/account/sso',
      //   headers: {
      //     'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGZlNjQ2MGI5MjMxYzVmYzcwMzI1M2Q4ODE5ZWM3NDJmZTI0MjViODU2ODI2MzE1ODg2NjAwMjQ2NDdkZjJkMDc1ZjY1MDQ5ZGVmOTg4NjgiLCJpYXQiOjE2NzQ4NDAzNjYuNDg2NjU5MDQ5OTg3NzkyOTY4NzUsIm5iZiI6MTY3NDg0MDM2Ni40ODY2NzkwNzcxNDg0Mzc1LCJleHAiOjE3MDYzNzYzNjYuNDY2ODQwOTgyNDM3MTMzNzg5MDYyNSwic3ViIjoiMSIsInNjb3BlcyI6W119.EiIJkpxES4-cfbyjd3pRw9DRecTkd_4nJb0c3CscF1AC3itMhPE6fbcHcTV7p8gHYBtYKqBaukriqF4Fs90m0pv9hPqcGYWJAyG5eFJ-y5tZYsNgv7rP70kUZIfDCXsoyDECMM6rkVLIHTlrCdIucK3beJjifvoOxQIkzZJylbMrZXD3Ndjcs6pQjZCNMBkz2Vkqb40lANkR-5AzEszVp_G3a1TQWovp1FAa6i3eanS2HO7RItLqA2ExO2t_RR1E0Ea3ShRU8O2OOdac0Dk1ax4sC-6f77ZreZltEi6jPjpIEpl1ZmhcTne8wBgZ9e8TqUj4k5kK5MCXee0RZxpeCpBKb1lzoMssoIDPVGqzOM5byKccGMMHbV1hJfViJJ8R0rHgtLV2AhqUV9BHY3VQKvahZfXFof1b3LIqbnKRHOjLWsDhuttDG2d-_mwHDC3AmJIRv9RBuuG07TKDkCJI6FIp4AXAne5F1z6LxqvL3ZYsedXOmRNtzDB4r_4F1AMAs9HxKcU0TnOkON8qbUlSlMU7nciy5Wo0daCJ0L7VEhSE2jl8qnmYdlB00k4chtWo4ZLCRdNk4tLqoRBCns7Ez-mb1ZlcNNjCJQYtJJ9LwFNg6aXNQFohQGGPG3dlSZ_QaLYi6ebMhqEi8xjWOcxXZU6dL0OWo_EtgZo7HMUQv7k',
      //   }
      // };
      //
      // axios(config)
      //     .then(function (response) {
      //       console.log(JSON.stringify(response.data));
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
    }
  }
</script>
