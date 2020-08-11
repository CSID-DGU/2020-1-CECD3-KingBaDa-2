<template>
  <div>
    <div style="background-color:#6FCEDC">
      <div class="white-font big-font">관리자페이지</div>
      <div><b-button   variant="light" class="white-font text-right transparent small-font" ><img src="../../assets/logout.png" />로그아웃</b-button></div>

    </div>
    <b-nav tabs justified>
      <b-nav-item active>Active</b-nav-item>
      <b-nav-item>Link</b-nav-item>
    </b-nav>

  </div>
</template>

<script>

export default {
  name: "AdminHome",
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style scoped>
.text-right{
  text-align: right;
  margin-right: 30px;
}
.transparent{
  background-color: transparent;
  border-color: transparent;
}
.white-font{
  color: white;
}
.small-font{
  font-size: 20px;
}
.big-font{
  font-size: 32px;
}
</style>
