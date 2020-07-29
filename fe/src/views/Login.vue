<template>
  <div>
    <div id = "title">
      <h1>DIS</h1>
      <h3>Dashboard Integration System</h3>
    </div>
    <div id = "login">
      <input type="text" placeholder="아이디"><br>
      <input type="password" placeholder="비밀번호"><br>
      <button @click="login">로그인</button><br>
      <button @click="login">회원가입</button>
    </div>
    <img src= "../assets/bts.jpg">
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'login'
    }
  },
  methods: {
    login () {
      this.$router.replace('main')
    }
  }
}
</script>

<style scoped>
  #login{
    margin-top: 30px;
    font-family: "굴림", Helvetica, Arial, sans-serif;
  }
  #title{
    margin-top: 100px;
  }
  h1{
    font-size: 48px;
    font-style: "Arial Black";
  }
  h3{
    font-size: 14px;
    font-style: Arial;
  }
  input{
    margin: 5px 0;
    width: 20%;
    padding: 10px;
    background-color: #d9d9d956;
    color: white;
  }
  button{
    margin-top: 10px;
    width: 20%;
    cursor: pointer;
    padding: 10px;
    background-color: #6FCEDC;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    outline: 0;
    border: 0;
  }
  img{
    position: absolute;
    bottom: 0;
    right: 0;
  }

</style>
