<template>
  <div id="app">main</div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      ID: "moongchi95",
      password: "ㅎㅇㅎㅇ"
    };
  },

  created() {
    // 2. 개발 서버를 이용해서 프록시 요청
    this.proxyRequest();
  },
  methods: {
    proxyRequest() {
      axios
        .post("/")
        .then(res => {
          console.log("proxyRequset res", res);
          console.log(this.ID);
        })
        .catch(error => {
          console.log("proxyRequset error", error);
        });
    }
  }
};
</script>
