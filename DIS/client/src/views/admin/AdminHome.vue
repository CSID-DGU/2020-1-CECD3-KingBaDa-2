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
    <b-tabs content-class="mt-3" align="center">
      <b-tab title="항목 관리" active>
        <div class="w-75 mx-auto">
          <b-form class="my-5" inline>
            <b-form-select v-model="selected.domain" :options="options.domain"></b-form-select>
            <b-form-input v-model="inputVal1"></b-form-input>
            <div>
              <b-button class="mx-2" @click="addDomain">도메인 추가</b-button>
              <b-button class="mx-2" @click="deleteDomain">도메인 제거</b-button>
            </div>
          </b-form>

          <div>
            <b-form inline>
              <b-form-select v-model="selected.sensor.x1" :options="options.sensor"></b-form-select>
              <b-form-select class="mr-5" v-model="selected.X1" :options="options.X1"></b-form-select>

              <b-form-select v-model="selected.sensor.x2" :options="options.sensor"></b-form-select>
              <b-form-select class="mr-5" v-model="selected.X2" :options="options.X2"></b-form-select>

              <b-form-select v-model="selected.sensor.x3" :options="options.sensor"></b-form-select>
              <b-form-select class="mr-5" v-model="selected.X3" :options="options.X3"></b-form-select>

              <b-form-select v-model="selected.sensor.y" :options="options.sensor"></b-form-select>
              <b-form-select class="mr-5" v-model="selected.Y1" :options="options.Y"></b-form-select>

              <b-form-select v-model="selected.graph" :options="options.graph"></b-form-select>
              <div class="mx-auto my-5">
                <b-button class="mx-2" @click="addItem">항목 추가</b-button>
                <b-button class="mx-2" @click="deleteItem">항목 제거</b-button>
              </div>
            </b-form>
          </div>

          <b-table striped hover :items="items"></b-table>
        </div>
      </b-tab>

      <b-tab title="직종 관리">
        <b-form class="w-75 mx-auto my-5" inline>
          <b-form-select v-model="selected.domain" :options="options.domain"></b-form-select>
          <b-form-select v-model="selected.job" :options="options.job"></b-form-select>
          <b-form-input v-model="inputVal2"></b-form-input>
          <b-button class="mx-2" @click="addJob">직종 추가</b-button>
          <b-button class="mx-2" @click="deleteJob">직종 제거</b-button>
          <b-table class="my-5" striped hover :items="items"></b-table>
        </b-form>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: "AdminHome",
  data() {
    return {
      inputVal1: "",
      inputVal2: "",
      selected: {
        domain: null,
        sensor: { x1: null, x2: null, x3: null, y: null },
        X1: null,
        X2: null,
        X3: null,
        Y1: null,
        graph: null,
        job: null
      },

      options: {
        domain: [
          { value: null, text: "도메인 선택" },
          { value: "전력세이빙", text: "전력세이빙" },
          { value: "헬스케어", text: "헬스케어" }
        ],
        sensor: [
          { value: null, text: "센서 선택" },
          { value: "통합감지센서", text: "통합감지센서" },
          { value: "스마트플러그", text: "스마트플러그" },
          { value: "레이더센서", text: "레이더센서" }
        ],
        X1: [
          { value: null, text: "dataset1 선택" },
          { value: "온도", text: "온도" },
          { value: "습도", text: "습도" },
          { value: "미세먼지", text: "미세먼지" }
        ],
        X2: [
          { value: null, text: "dataset2 선택" },
          { value: "온도", text: "온도" },
          { value: "습도", text: "습도" },
          { value: "미세먼지", text: "미세먼지" }
        ],
        X3: [
          { value: null, text: "dataset3 선택" },
          { value: "온도", text: "온도" },
          { value: "습도", text: "습도" },
          { value: "미세먼지", text: "미세먼지" }
        ],
        Y: [
          { value: null, text: "Y축 선택" },
          { value: "시간", text: "시간" },
          { value: "온도", text: "온도" },
          { value: "습도", text: "습도" },
          { value: "미세먼지", text: "미세먼지" }
        ],
        graph: [
          { value: null, text: "그래프 선택" },
          { value: "line", text: "line" },
          { value: "bar", text: "bar" },
          { value: "scatter", text: "scatter" },
          { value: "pie", text: "pie" },
          { value: "table", text: "table" },
          { value: "gauge", text: "gauge" }
        ],
        job: [{ value: null, text: "직종 선택" }]
      },
      items: [
        {
          domain: "전력세이빙",
          Dataset1: "온도",
          Dataset2: "습도",
          Dataset3: "",
          "Y-axis": "시간",
          graph: "bar"
        },
        {
          domain: "전력세이빙",
          Dataset1: "습도",
          "Y-axis": "시간",
          graph: "line"
        },
        {
          domain: "전력세이빙",
          Dataset1: "전력량",
          "Y-axis": "시간",
          graph: "line"
        },
        {
          domain: "전력세이빙",
          Dataset1: "전류",
          "Y-axis": "시간",
          graph: "pie"
        }
      ]
    };
  },
  methods: {
    addDomain() {
      if (this.inputVal1 != "") {
        this.options.domain.push({
          value: this.inputVal1,
          text: this.inputVal1
        });
      } else {
        alert("도메인을 입력하세요!");
      }
    },
    deleteDomain() {
      if (this.options.domain.pop().value == null) {
        this.options.domain.push({ value: null, text: "도메인 선택" });
        alert("삭제할 도메인이 없습니다!");
      }
    },
    addItem() {
      this.items.push({
        domain: this.selected.domain,
        Dataset1: this.selected.X1,
        Dataset2: this.selected.X2,
        Dataset3: this.selected.X3,
        "Y-axis": this.selected.Y1,
        graph: this.selected.graph
      });
    },
    deleteItem() {
      this.items.pop().value;
    },
    addJob() {
      if (this.inputVal2 != "") {
        this.options.job.push({
          value: this.inputVal2,
          text: this.inputVal2
        });
      } else {
        alert("직종을 입력하세요!");
      }
    },
    deleteJob() {
      if (this.options.job.pop().value == null) {
        this.options.job.push({ value: null, text: "직종 선택" });
        alert("삭제할 직종이 없습니다!");
      }
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
