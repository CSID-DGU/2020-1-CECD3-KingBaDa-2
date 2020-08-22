<template>
  <div>
    <b-card class="profile w-25 mx-auto">
      <div>
        <b-avatar variant="primary" src size="4rem"></b-avatar>
      </div>
      <br />
      <div>{{userName}}</div>
      <div>{{userDomain}}</div>
      <button v-b-modal.modal-1>회원정보 변경</button>
      <br />
    </b-card>

    <b-modal id="modal-1" title="회원정보 변경"></b-modal>
  </div>
</template>

<script>
export default {
  name: "Setting",
  data() {
    return { userName: "차민형", userDomain: "시설관리팀" };
  },
  methods: {}
};
</script>

<style scoped>
.profile {
  position: relative;
  margin-top: 100px;
}
button {
  margin-top: 10px;
  width: 30%;
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
