<template>
  <div>
    <div class="title">
      <div class="DIS">DIS</div>
      <div class="subDIS">Dashboard Integration System</div>
    </div>
    <div id="login">
      <input type="text" placeholder="아이디" v-model="id" /><br />
      <input type="password" placeholder="비밀번호" v-model="password"/><br />
      <button @click="loginUser">로그인</button><br />
      <button @click="loginAdmin">회원가입</button>
    </div>
    <img src="../assets/bts.jpg" />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: "Login",
      id: "",
      password: "",
    };
  },
  methods: {
    loginUser() {
      const dt = [{loc1:"00"},{date:{"gte":"2020-01-01","lte":"2020-01-02"}}]
      axios.post("/api/elastic/elastic-cal", dt)
      .then(r => console.log("r: ", JSON.stringify(r, null, 2)))
      .catch(function (error){
        console.log(error.response);
      });
      this.$router.push("/id/main")
    },
    loginAdmin(){
      // console.log('call login admin api');
      let userData = {
        id:this.id,
        pw:this.password
      }
      axios.post("/api/sign/admin-login", userData)
      .then((r) => {
        // console.log("r: ", r);
        if(r){
          if(r.data.data==1){
            this.$router.push("/AdminHome");
          } else {
            alert('id, password 확인');
          }
        } else {
          alert('id, password 확인');
        }
      })
      .catch(function (error){
        console.log(error.response);
      });
    }
  }
};
</script>

<style scoped>
  #login{
    margin-top: 30px;
    font-family: "굴림", Helvetica, Arial, sans-serif;
  }
  .title {
    position: relative;
    margin-top: 200px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: black;
    z-index: 2;
    text-align: center;
  }
  .DIS{
    font-size: 50px;
    font-weight: bold;
  }
  .subDIS{
    font-size: 30px;
  }
  input{
    margin: 5px 0;
    width: 20%;
    padding: 10px;
    background-color: #d9d9d956;
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
