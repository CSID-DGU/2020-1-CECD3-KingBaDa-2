<template>
  <div style="position: absolute; width: 100%; height: 100%; background:#6fcedc">
    <b-card class="cardSize shadow-lg p-3 mb-5 bg-white rounded-1">
      <div class="title">
        <div class="DIS">DIS</div>
        <div class="subDIS">Dashboard Integration System</div>
      </div>
      <div id="login">
        <input type="text" placeholder="아이디" v-model="id" /><br />
        <input type="password" placeholder="비밀번호" v-model="password" /><br />
        <b-button @click="loginUser">로그인</b-button><br />
        <b-button>회원가입</b-button>
      </div>
        <img src="../assets/bts.jpg" class="BTSLogo"/>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "Login",
      id: "",
      password: ""
    };
  },
  methods: {
    loginUser() {
      if (this.id.indexOf("admin") != -1) {
        // console.log('call login admin api');
        let userData = {
          id: this.id,
          pw: this.password
        };
        axios
          .post("/api/sign/admin-login", userData)
          .then(r => {
            // console.log("r: ", r);
            if (r) {
              if (r.data.data == 1) {
                this.$router.push("/AdminHome");
              } else {
                alert("id, password 확인");
              }
            } else {
              alert("id, password 확인");
            }
          })
          .catch(function(error) {
            console.log(error.response);
          });
      } else {
        const dt = [{ name: this.id }, { location1: this.password }];
        axios
          .post("/api/elastic/get", dt)
          .then(r => console.log("r: ", JSON.stringify(r, null, 2)))
          .catch(function(error) {
            console.log(error.response);
          });
        this.$router.push("/id/main");
      }
    }
  }
};
</script>

<style scoped>
#login {
  margin-top: 30px;
  font-family: "굴림", Helvetica, Arial, sans-serif;
}
.title {
  position: relative;
  top: 50px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  z-index: 2;
  text-align: center;
}
.DIS {
  font-size: 50px;
  font-weight: bold;
}
.subDIS {
  font-size: 30px;
}
.BTSLogo{
  margin-top: 30px;
  width: 200px;
}
.cardSize{
  position: relative;
  top: 20%;
  margin: auto;
  width: 800px;
  height: 500px;
  border-radius: 50px;
}
input {
  margin: 5px 0;
  width: 60%;
  padding: 10px;
  background-color: #d9d9d956;
}
button {
  margin-top: 10px;
  width: 30%;
  height: 5%;
  cursor: pointer;
  padding: 10px;
  background-color: #6fcedc;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  outline: 0;
  border: 0;
}

</style>
