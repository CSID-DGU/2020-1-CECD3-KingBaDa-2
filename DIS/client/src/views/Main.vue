<template>
  <div class="main">
    <div class="backimg">
      <img src="../assets/backg.jpg" width="100%"/>
      <br />
      <br />
      <br />
    </div>
    <div>
      <b-button pill variant="info" size="lg" style="width: 300px" @click="toDashboard">
        <img class="icon-img" src="../assets/icon/dashboard.png" />
        <br />대시보드 조회
      </b-button>
      <br />
      <br />
    </div>
    <div>
      <b-button class="noticeButton" variant="info" @click="toNotice">공지사항</b-button>
      <br />
      <hr />
      {{ 공지사항1 }}
      <br />
      {{ 공지사항2 }}
      <br />
      {{ 공지사항3 }}
      <br />
    </div>
  </div>
</template>

<script>


export default {
  name: "Main",
  data() {
    return {
      path: "",
      공지사항1: "공지 사항1",
      공지사항2: "공지 사항2",
      공지사항3: "공지 사항3"
    };
  },
  methods:{
    toDashboard(){
      this.path = "Dashboard";
      this.$EventBus.$emit('Dashboard');
      this.$router.push('Dashboard');
    },
    toNotice(){
      this.path = "Notice";
      this.$EventBus.$emit('Notice');
      this.$router.push('Notice');
    }
  }
};
</script>

<style>
.noticeButton {
  background-color: transparent;
  border-color: transparent;
  color: #6FCEDC;
  font-size: 30px;
}
.backimg {
  position: relative;
  width: 100%;
  background-size: cover;
}
.backimg .title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  z-index: 2;
  text-align: center;
}
.icon-img {
  width: auto;
  height: auto;
  max-width: 100px;
  max-height: 100px;
}
hr {
  width: 10%;
}
</style>
