<template>
  <div>
    <div style="background-color:#6FCEDC">
      <div class="white-font big-font">관리자페이지</div>
      <div>
        <b-button
          @click="logout"
          variant="light"
          class="white-font text-right transparent small-font"
        >
          <img src="../../assets/logout.png" />로그아웃
        </b-button>
      </div>
    </div>
    <b-tabs content-class="mt-3" align="center">
      <b-tab title="항목 관리" active>
        <div class="w-75 mx-auto">
          <b-form class="my-5" inline>
            <b-form-select v-model="selected.domain" :options="options.domain">
              <template v-slot:first>
                <b-form-select-option value="null">도메인 선택</b-form-select-option>
              </template>
            </b-form-select>
            <b-form-input v-model="inputVal1"></b-form-input>
            <div>
              <b-button class="mx-2" @click="addDomain">도메인 추가</b-button>
              <b-button class="mx-2" @click="deleteDomain">도메인 제거</b-button>항목 이름 :
              <b-form-input v-model="inputVal2"></b-form-input>
            </div>
          </b-form>

          <div>
            <b-form inline>
              <b-form-select class="mr-5" v-model="selected.X1" :options="options.X1">
                <template v-slot:first>
                  <b-form-select-option value="null">dataset1 선택</b-form-select-option>
                </template>
              </b-form-select>
              <b-form-select class="mr-5" v-model="selected.X2" :options="options.X2">
                <template v-slot:first>
                  <b-form-select-option value="null">dataset2 선택</b-form-select-option>
                </template>
              </b-form-select>
              <b-form-select class="mr-5" v-model="selected.X3" :options="options.X3">
                <template v-slot:first>
                  <b-form-select-option value="null">dataset3 선택</b-form-select-option>
                </template>
              </b-form-select>
              <b-form-select class="mr-5" v-model="selected.X4" :options="options.X4">
                <template v-slot:first>
                  <b-form-select-option value="null">dataset4 선택</b-form-select-option>
                </template>
              </b-form-select>
              <b-form-select class="mr-5" v-model="selected.X5" :options="options.X5">
                <template v-slot:first>
                  <b-form-select-option value="null">dataset5 선택</b-form-select-option>
                </template>
              </b-form-select>

              <b-form-select class="mr-5" v-model="selected.Y1" :options="options.Y1">
                <template v-slot:first>
                  <b-form-select-option value="null">value1 선택</b-form-select-option>
                  <b-form-select-option value="시간">시간</b-form-select-option>
                </template>
              </b-form-select>
              <b-form-select class="mr-5" v-model="selected.Y2" :options="options.Y2">
                <template v-slot:first>
                  <b-form-select-option value="null">value2 선택</b-form-select-option>
                  <b-form-select-option value="시간">시간</b-form-select-option>
                </template>
              </b-form-select>

              <b-form-select v-model="selected.graph" :options="options.graph">
                <template v-slot:first>
                  <b-form-select-option value="null">그래프 선택</b-form-select-option>
                </template>
              </b-form-select>
              <div class="mx-auto my-5">
                <b-button class="mx-2" @click="addItem">항목 추가</b-button>
                <b-button class="mx-2" @click="deleteItem">항목 제거</b-button>
              </div>
            </b-form>
          </div>

          <b-table
            striped
            hover
            ref="selectableTable"
            selectable
            :items="items"
            :fields="fields"
            @row-selected="onRowSelected"
            responsive="sm"
          >
            <template v-slot:cell(default)="{ rowSelected }">
              <template v-if="rowSelected">
                <span aria-hidden="true">&check;</span>
                <span class="sr-only">Selected</span>
              </template>
              <template v-else>
                <span aria-hidden="true">&nbsp;</span>
                <span class="sr-only">Not selected</span>
              </template>
            </template>
          </b-table>
          <b-button class="mx-2" @click="saveSelected">저장</b-button>
          <b-button class="mx-2" @click="clearSelected">초기화</b-button>
        </div>
      </b-tab>

      <b-tab title="직종 관리">
        <div class="w-75 mx-auto">
          <b-form class="w-50 mx-auto my-5" inline>
            <b-form-select v-model="selected.domain" :options="options.domain">
              <template v-slot:first>
                <b-form-select-option value="null">도메인 선택</b-form-select-option>
              </template>
            </b-form-select>
            <b-table striped hover :items="job"></b-table>
            <b-form-input v-model="inputVal3"></b-form-input>
            <b-button class="mx-2" @click="addJob">직종 추가</b-button>
            <b-button class="mx-2" @click="deleteJob">직종 제거</b-button>
          </b-form>
          <b-table striped hover :items="items" :fields="fields"></b-table>
        </div>
      </b-tab>
    </b-tabs>default Rows
    <br />
    <div v-for="item in selected.row" :key="item.name">{{ item.name }}</div>
  </div>
</template>

<script>
export default {
  name: "AdminHome",
  data() {
    return {
      fields: [
        "domain",
        "name",
        "Dataset1",
        "Dataset2",
        "Dataset3",
        "Dataset4",
        "Dataset5",
        "value1",
        "value2",
        "graph",
        "default"
      ],
      inputVal1: "",
      inputVal2: "",
      inputVal3: "",
      row: [],
      job: [{ 직종: "시설관리팀" }],
      selected: {
        domain: null,
        X1: null,
        X2: null,
        X3: null,
        X4: null,
        X5: null,
        Y1: null,
        Y2: null,
        graph: null,
        row: []
      },

      options: {
        domain: [
          { value: "전력세이빙", text: "전력세이빙" },
          { value: "헬스케어", text: "헬스케어" }
        ],
        X1: [
          { value: "온도", text: "온도" },
          { value: "습도", text: "습도" },
          { value: "미세먼지", text: "미세먼지" }
        ],
        X2: [
          { value: "온도", text: "온도" },
          { value: "습도", text: "습도" },
          { value: "미세먼지", text: "미세먼지" }
        ],
        X3: [
          { value: "온도", text: "온도" },
          { value: "습도", text: "습도" },
          { value: "미세먼지", text: "미세먼지" }
        ],
        X4: [
          { value: "온도", text: "온도" },
          { value: "습도", text: "습도" },
          { value: "미세먼지", text: "미세먼지" }
        ],
        X5: [
          { value: "온도", text: "온도" },
          { value: "습도", text: "습도" },
          { value: "미세먼지", text: "미세먼지" }
        ],
        Y1: [
          { value: "온도", text: "온도" },
          { value: "습도", text: "습도" },
          { value: "미세먼지", text: "미세먼지" }
        ],
        Y2: [
          { value: "온도", text: "온도" },
          { value: "습도", text: "습도" },
          { value: "미세먼지", text: "미세먼지" }
        ],
        graph: [
          { value: "line", text: "line" },
          { value: "bar", text: "bar" },
          { value: "scatter", text: "scatter" },
          { value: "pie", text: "pie" },
          { value: "gauge", text: "gauge" },
          { value: "table", text: "table" }
        ]
      },
      items: [
        {
          domain: "전력세이빙",
          name: "일간 온습도 비교",
          Dataset1: "온도",
          Dataset2: "습도",
          value1: "온도",
          value2: "습도",
          graph: "scatter"
        },
        {
          domain: "전력세이빙",
          name: "월간 습도 비교",
          Dataset1: "습도",
          value1: "시간",
          graph: "line"
        },
        {
          domain: "전력세이빙",
          name: "월간 전력량 비교",
          Dataset1: "전력량",
          value1: "시간",
          graph: "line"
        },
        {
          domain: "전력세이빙",
          name: "월간 전류 비교",
          Dataset1: "전류",
          value1: "시간",
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
      if (this.options.domain.pop() == null) {
        alert("삭제할 도메인이 없습니다!");
      }
    },
    addItem() {
      this.items.push({
        domain: this.selected.domain,
        name: this.inputVal2,
        Dataset1: this.selected.X1,
        Dataset2: this.selected.X2,
        Dataset3: this.selected.X3,
        Dataset4: this.selected.X4,
        Dataset5: this.selected.X5,
        value1: this.selected.Y1,
        value2: this.selected.Y2,
        graph: this.selected.graph
      });
    },
    deleteItem() {
      this.items.pop().value;
    },
    addJob() {
      if (this.inputVal3 != "") {
        this.job.push({
          직종: this.inputVal3
        });
      } else {
        alert("직종을 입력하세요!");
      }
    },
    deleteJob() {
      this.job.pop();
    },
    onRowSelected(items) {
      this.row = items;
    },
    saveSelected() {
      this.selected.row = this.row;
      alert("저장되었습니다!");
    },
    clearSelected() {
      this.selected.row = [];
    },
    logout() {
      this.$router.push("/");
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
