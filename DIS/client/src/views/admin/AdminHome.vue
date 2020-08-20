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
        <!-- 표 row별 수정 및 삭제, 조건별 필터 추가 구현 필요 -->
        <div class="w-75 mx-auto">
          <b-form class="my-5" inline>
            <b-form-select class="mx-5" v-model="selected.domain" :options="options.domain">
              <template v-slot:first>
                <b-form-select-option value="null">도메인 선택</b-form-select-option>
              </template>
            </b-form-select>
            <div>
              항목 이름 :
              <b-form-input placeholder="추가할 항목 이름 입력" class="ml-3" v-model="inputItem"></b-form-input>
            </div>
          </b-form>
          <div>
            <div>
              <b-card-group deck>
                <b-card title="dataset 설정">
                  <b-button v-b-modal.modal-1 class="mx-2">dataset 설정</b-button>
                  <template v-slot:footer>
                    선택된 Dataset :
                    <span
                      v-for="dataset_item in selected.dataset"
                      :key="dataset_item"
                    >{{ dataset_item }}&nbsp;</span>
                  </template>
                </b-card>

                <b-card title="value 설정">
                  <b-button v-b-modal.modal-2 class="mx-2 mb-3">value 설정</b-button>
                  <b-form-radio-group
                    id="valTypegroup"
                    v-model="selected.valType"
                    name="radio-valType"
                  >
                    <b-form-radio value="sum">누적값</b-form-radio>
                    <b-form-radio value="avg">평균값</b-form-radio>
                    <b-form-radio value="max">최대값</b-form-radio>
                    <b-form-radio value="min">최소값</b-form-radio>
                  </b-form-radio-group>
                  <template v-slot:footer>
                    선택된 Value :
                    <span
                      v-for="value_item in selected.value"
                      :key="value_item"
                    >{{ value_item }}&nbsp;</span>
                  </template>
                </b-card>
                <b-card title="그래프 설정">
                  <b-button v-b-modal.modal-3 class="mx-2 mb-3">그래프 표시 범위 설정</b-button>

                  <b-form-select class="my-2" v-model="selected.graph" :options="options.graph">
                    <template v-slot:first>
                      <b-form-select-option value="null">그래프 선택</b-form-select-option>
                    </template>
                  </b-form-select>

                  <b-form-checkbox
                    id="defaultCheck"
                    v-model="selected.status"
                    name="checkbox-1"
                    value="defaultGraph"
                  >디폴트 그래프 설정</b-form-checkbox>
                  <template v-slot:footer>선택된 그래프 : {{selected.graph}}</template>
                </b-card>
              </b-card-group>
            </div>
          </div>
          <b-button class="mx-2 my-5" @click="addItem">추가</b-button>
          <b-button class="mx-2 my-5" @click="deleteItem">삭제</b-button>
          <b-table
            striped
            hover
            ref="selectableTable"
            selectable
            select-mode="single"
            :items="items"
            :fields="fields"
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
        </div>
      </b-tab>
      <b-tab title="도메인, 직종 관리">
        <div class="w-75 mt-5 mx-auto">
          <b-card-group deck>
            <b-card title="도메인 관리">
              <b-list-group>
                <b-list-group-item>
                  <strong>도메인</strong>
                </b-list-group-item>
                <b-list-group-item
                  v-for="domain_item in options.domain"
                  :key="domain_item.value"
                >{{ domain_item.value }}</b-list-group-item>
              </b-list-group>
              <b-form class="my-5" inline>
                <b-form-input v-model="inputDomain"></b-form-input>
                <b-button class="mx-2" @click="addDomain">도메인 추가</b-button>
                <b-button class="mx-2" @click="deleteDomain">도메인 제거</b-button>
              </b-form>
            </b-card>
            <b-card title="직종 관리">
              <b-list-group>
                <b-list-group-item>
                  <strong>직종</strong>
                </b-list-group-item>
                <b-list-group-item v-for="jobs in job" :key="jobs.type">
                  <b-badge>{{ jobs.domain }}</b-badge>
                  {{ jobs.type }}
                </b-list-group-item>
              </b-list-group>
              <b-form class="my-5" inline>
                <b-form-select class="mr-5" v-model="selected.domain" :options="options.domain">
                  <template v-slot:first>
                    <b-form-select-option value="null">도메인 선택</b-form-select-option>
                  </template>
                </b-form-select>
                <b-form-input v-model="inputJob"></b-form-input>
                <b-button class="mx-2" @click="addJob">직종 추가</b-button>
                <b-button class="mx-2" @click="deleteJob">직종 제거</b-button>
              </b-form>
            </b-card>
          </b-card-group>
        </div>
      </b-tab>
      <b-tab title="요청 사항">
        <NoticeComp />
      </b-tab>
      <!-- <b-tab title="모달테스트"></b-tab> -->
    </b-tabs>
    <b-modal id="modal-1" title="dataset 설정" @cancel="resetDataset">
      <b-form-select @change="addDataset" v-model="dataset" :options="options.dataset">
        <template v-slot:first>
          <b-form-select-option value="null">dataset 선택</b-form-select-option>
        </template>
      </b-form-select>
      <b-list-group class="my-3">
        <b-list-group-item>
          <strong>추가 Dataset 목록</strong>
        </b-list-group-item>
        <b-list-group-item v-for="dataset_item in selected.dataset" :key="dataset_item">
          {{ dataset_item }}
          <b-button @click="deleteDatasetItem">삭제</b-button>
        </b-list-group-item>
      </b-list-group>
      <b-button class="mx-2" @click="resetDataset">모두 삭제</b-button>
    </b-modal>
    <b-modal id="modal-2" title="value 설정" @cancel="resetValue">
      <b-form-select @change="addValue" v-model="value" :options="options.value">
        <template v-slot:first>
          <b-form-select-option value="null">value 선택</b-form-select-option>
        </template>
      </b-form-select>
      <b-list-group class="my-3">
        <b-list-group-item>
          <strong>추가 Value 목록</strong>
        </b-list-group-item>
        <b-list-group-item v-for="value_item in selected.value" :key="value_item">
          {{ value_item }}
          <b-button @click="deleteValueItem">삭제</b-button>
        </b-list-group-item>
      </b-list-group>
      <b-button class="mx-2" @click="resetValue">모두 삭제</b-button>
    </b-modal>
    <b-modal id="modal-3" title="range 설정" @cancel="resetValue">
      <b-form-group>
        <b-form-radio-group id="rangegroup" v-model="selected.range" name="radio-range">
          <b-form-radio value="year">연간</b-form-radio>
          <b-form-radio value="month">월간</b-form-radio>
          <b-form-radio value="day">일간</b-form-radio>
          <b-form-radio value="oneDay">하루</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <div v-if="selected.range == 'year'">
        <label for="sb-wrap">시작 날짜</label>
        <b-form-spinbutton class="my-3" id="sb-wrap" wrap min="2015" max="2030" placeholder="year"></b-form-spinbutton>

        <label for="sb-wrap">끝 날짜</label>
        <b-form-spinbutton class="my-3" id="sb-wrap" wrap min="2015" max="2030" placeholder="year"></b-form-spinbutton>
      </div>
      <div v-if="selected.range == 'month'">
        <label for="sb-wrap">시작 날짜</label>
        <b-form-spinbutton class="mt-3" id="sb-wrap" wrap min="2015" max="2030" placeholder="year"></b-form-spinbutton>
        <b-form-spinbutton class="mb-3" id="sb-wrap" wrap min="1" max="12" placeholder="month"></b-form-spinbutton>

        <label for="sb-wrap">끝 날짜</label>
        <b-form-spinbutton class="mt-3" id="sb-wrap" wrap min="2015" max="2030" placeholder="year"></b-form-spinbutton>
        <b-form-spinbutton id="sb-wrap" wrap min="1" max="12" placeholder="month"></b-form-spinbutton>
      </div>
      <div v-if="selected.range == 'day'">
        <label for="datepicker1">시작 날짜</label>
        <b-form-datepicker
          class="my-3"
          id="datepicker1"
          placeholder="시작날짜 선택"
          local="en"
          dark="true"
        ></b-form-datepicker>

        <label for="datepicker2">끝 날짜</label>
        <b-form-datepicker
          class="my-3"
          dark="true"
          id="datepicker2"
          placeholder="끝날짜 선택"
          local="en"
        ></b-form-datepicker>
      </div>
      <div v-if="selected.range == 'oneDay'">
        <div>
          <label for="datepicker3">표시 날짜</label>
          <b-form-datepicker class="my-3" id="datepicker3" placeholder="표시날짜 선택" local="en"></b-form-datepicker>
        </div>
      </div>
      <div v-else></div>
    </b-modal>
  </div>
</template>

<script>
import NoticeComp from "@/components/NoticeComp.vue";
import axios from "axios";

export default {
  name: "AdminHome",
  components: {
    NoticeComp
  },
  data() {
    return {
      fields: [
        "domain",
        "name",
        "Dataset",
        "value",
        "valType",
        "graph",
        "range",
        "status"
      ],
      admin_id: "admin1",
      inputDomain: "",
      inputItem: "",
      inputJob: "",
      dataset: null,
      value: null,
      row: [],
      job: [
        { domain: "전력세이빙", type: "시설관리처" },
        { domain: "전력세이빙", type: "총무처" }
      ],
      selected: {
        status: null,
        domain: null,
        dataset: [],
        value: [],
        graph: null,
        row: [],
        range: null,
        date: { start: null, end: null },
        valType: "sum"
      },

      options: {
        domain: [
          { value: "전력세이빙", text: "전력세이빙" },
          { value: "헬스케어", text: "헬스케어" }
        ],
        dataset: [
          { value: "testbed", text: "testbed" },
          { value: "6114", text: "6114" },
          { value: "2113", text: "2113" },
          { value: "3321", text: "3321" },
          { value: "5146", text: "5146" }
        ],
        value: [
          { value: "온도", text: "온도" },
          { value: "습도", text: "습도" },
          { value: "미세먼지", text: "미세먼지" },
          { value: "전력량", text: "전력량" }
        ],
        graph: [
          { value: "line", text: "line" },
          { value: "bar", text: "bar" },
          { value: "scatter", text: "scatter" },
          { value: "pie", text: "pie" },
          { value: "gauge", text: "gauge" }
        ]
      },
      items: [
        {
          domain: "전력세이빙",
          name: "일간 온습도 비교",
          Dataset: "testbed",
          value: ["온도", "습도"],
          valType: "sum",
          graph: "scatter",
          range: "day",
          status: "default"
        },
        {
          domain: "전력세이빙",
          name: "월간 습도 비교",
          Dataset: "testbed",
          value: "습도",
          valType: "avg",
          graph: "line",
          range: "month",
          status: "default"
        },
        {
          domain: "전력세이빙",
          name: "월간 전력량 비교",
          Dataset: "testbed",
          value: "전력량",
          valType: "sum",
          graph: "line",
          range: "month",
          status: "default"
        },
        {
          domain: "전력세이빙",
          name: "강의실별 전력량 비교",
          Dataset: ["6114", "2113", "3321", "5146"],
          value: "전력량",
          valType: "sum",
          graph: "pie",
          range: "none"
        }
      ]
    };
  },
  mounted() {
    this.getDomain();
  },
  methods: {
    getDomain() {
      let tempArr;
      axios
        .get("/api/admin/domain?admin_id=" + this.admin_id)
        .then(r => {
          tempArr = r.data;
          for (var n in tempArr) {
            this.options.domain.push({
              domain: tempArr[n].user_domain,
              type: tempArr[n].user_domain
            });
          }
        })
        .catch(function(error) {
          console.log(error.response);
        });
    },
    addDomain() {
      if (this.inputDomain != "") {
        axios
          .post("/api/admin/domain", [
            { admin_id: this.admin_id },
            { user_domain: this.inputDomain }
          ])
          .then(r => {
            console.log(r);
            this.options.domain.push({
              value: this.inputDomain,
              text: this.inputDomain
            });
          })
          .catch(function(error) {
            console.log(error.response);
          });
      } else {
        alert("도메인을 입력하세요!");
      }
    },
    deleteDomain() {
      axios
        .delete("/api/admin/domain", {
          data: {
            admin_id: this.admin_id,
            user_domain: this.options.domain[this.options.domain - 1].value
          },
          withCredentials: true
        })
        .then(res => {
          console.log(res.data);
          this.options.domain.pop();
        })
        .catch(function(error) {
          console.log(error.response);
        });
    },
    getItem() {
      let tempArr;
      axios
        .get("/api/admin/domain?admin_id=" + this.admin_id)
        .then(r => {
          tempArr = r.data;
          for (var n in tempArr) {
            this.options.domain.push({
              domain: tempArr[n].user_domain,
              type: tempArr[n].user_domain
            });
          }
        })
        .catch(function(error) {
          console.log(error.response);
        });
    },
    addItem() {
      if (this.selected.domain == null) alert("도메인을 선택해주세요!");
      else if (this.inputItem == "") alert("항목 이름을 입력해주세요!");
      else if (this.selected.graph == null)
        alert("그래프 종류를 선택해주세요!");
      else {
        this.items.push({
          domain: this.selected.domain,
          name: this.inputItem,
          Dataset: this.selected.dataset,
          value: this.selected.value,
          graph: this.selected.graph,
          range: this.selected.range
        });
        if (this.selected.status == "defaultGraph") {
          this.items[this.items.length - 1].status = "default";
        }
      }
    },
    deleteItem() {
      this.items.pop();
    },
    addJob() {
      if (this.inputJob != "" && this.selected.domain != null) {
        this.job.push({
          domain: this.selected.domain,
          type: this.inputJob
        });
      } else if (this.selected.domain == null) {
        alert("도메인을 선택하세요!");
      } else if (this.selected.domain == "null") {
        alert("도메인을 선택하세요!");
      } else {
        alert("직종을 입력하세요!");
      }
      console.log(this.selected.domain);
    },
    deleteJob() {
      this.job.pop();
    },
    addDataset() {
      this.selected.dataset.push(this.dataset);
    },
    resetDataset() {
      this.selected.dataset = [];
    },
    addValue() {
      this.selected.value.push(this.value);
    },
    resetValue() {
      this.selected.value = [];
    },
    saveSelected() {
      this.selected.row = this.row;
      alert("저장되었습니다!");
    },
    clearSelected() {
      this.options.pop();
    },
    deleteDatasetItem(dataset_item) {
      this.selected.dataset.splice(
        this.selected.dataset.lastIndexOf(dataset_item),
        1
      );
    },
    deleteValueItem(value_item) {
      this.selected.value.splice(
        this.selected.value.lastIndexOf(value_item),
        1
      );
    },
    logout() {
      this.$router.push("/");
    }
    // onRowSelected(items) {
    //   this.options.forEach(function(element, index) {
    //     console.log(index);
    //     if (element.name == items.name) {
    //       this.options.splice(index, 1);
    //     }
    //   });
    // },
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
