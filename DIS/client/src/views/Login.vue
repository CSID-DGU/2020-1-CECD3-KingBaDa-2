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
        <b-button class="LoginPageBtn" @click="loginUser">로그인</b-button><br />
        <b-button class="LoginPageBtn" v-b-modal.register>회원가입</b-button>
        <b-modal id="register" centered no-close-on-esc no-close-on-backdrop title="회원가입" v-model="modalShow">
          <form ref="form" text-centered @submit.stop.prevent="handleSubmit">
            <b-form-group
              :state="form.nameState"
              label="이름"
              label-for="name-input"
              invalid-feedback="이름을 입력하세요"
            >
              <b-form-input
                id="name-input"
                v-model="form.name"
                :state="form.nameState"
                required
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
              :state="form.idState"
              label="아이디"
              label-for="id-input"
              invalid-feedback="아이디를 입력하세요"
            >
              <b-form-input
                id="id-input"
                v-model="form.id"
                :state="form.idState"
                required
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
              :state="form.passwordState"
              label="비밀번호"
              label-for="password-input"
              invalid-feedback="비밀번호를 입력하세요"
            >
              <b-form-input
                id="password_input"
                v-model="form.password"
                :state="form.passwordState"
                required
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
              :state="password2State"
              label="비밀번호 재확인"
              label-for="password2-input"
              invalid-feedback="비밀번호가 다릅니다"
            >
              <b-form-input
                id="password2_input"
                v-model="form.password2"
                :state="form.password2State"
                required
              >
              </b-form-input>
            </b-form-group>
          </form>
          <template #modal-footer>
            <div class="w-100">
              <b-button
                variant="secondary"
                size="lg"
                class="float-right"
                style="margin-right: 20px"
                @click="resetModal"
              >
                닫기
              </b-button>
              <b-button
                variant="info"
                size="lg"
                class="float-right"
                style="margin-right: 30px; width: 100px"
                @click="resetModal"
              >
                확인
              </b-button>
            </div>
          </template>
        </b-modal>
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
      modalShow: false,
      id: "",
      password: "",
      form:{
        name: '',
        id: '',
        password: '',
        password2: '',
      }
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
    },
    resetModal() {
        this.form.name = '';
        this.form.id = '';
        this.form.password = '';
        this.form.password2 = '';
        this.modalShow = false;
      },
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
.LoginPageBtn {
  margin-top: 20px;
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
input {
  margin: 5px 0;
  width: 60%;
  padding: 10px;
  background-color: #d9d9d956;
}


</style>
