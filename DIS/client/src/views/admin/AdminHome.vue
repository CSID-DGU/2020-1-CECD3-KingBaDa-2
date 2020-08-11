<template>
  <div>
    <div style="background-color:#6FCEDC">
      <div class="white-font big-font">관리자페이지</div>
      <div>
        <b-button variant="light" class="white-font text-right transparent small-font">
          <img src="../../assets/logout.png" />로그아웃
        </b-button>
      </div>
    </div>
    <div>
      <b-form inline>
        <b-form-select v-model="selected_domain" :options="options_domain"></b-form-select>
        <b-form-input v-model="inputVal"></b-form-input>
        <b-button @click="addDomain">도메인 추가</b-button>
        <b-button @click="deleteDomain">도메인 제거</b-button>
      </b-form>
      <br />domain-Selected:
      <strong>{{ selected_domain }}</strong>

      <b-table striped hover :items="items"></b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminHome",
  data() {
    return {
      inputVal: "",
      selected_domain: null,
      options_domain: [
        { value: null, text: "도메인 선택" },
        { value: "전력세이빙", text: "전력세이빙" },
        { value: "헬스케어", text: "헬스케어" }
      ],
      items: [
        {
          domain: "전력세이빙",
          "X-axis": ["온도", "습도"],
          "Y-axis": "시간",
          graph: "bar"
        },
        {
          domain: "전력세이빙",
          "X-axis": "습도",
          "Y-axis": "시간",
          graph: "line"
        },
        {
          domain: "전력세이빙",
          "X-axis": "전력량",
          "Y-axis": "시간",
          graph: "line"
        },
        {
          domain: "전력세이빙",
          "X-axis": "전류",
          "Y-axis": "시간",
          graph: "pie"
        }
      ]
    };
  },
  methods: {
    addDomain() {
      this.options_domain.push({
        value: this.inputVal,
        text: this.inputVal
      });
    },
    deleteDomain() {
      this.options_domain.pop();
    }
  }
};
</script>

<style scoped>
.text-right {
  text-align: right;
  margin-right: 30px;
}
.transparent {
  background-color: transparent;
  border-color: transparent;
}
.white-font {
  color: white;
}
.small-font {
  font-size: 20px;
}
.big-font {
  font-size: 32px;
}
</style>
