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
      <b-tab title="디바이스 관리" active>
        <b-card title="디바이스 목록">
          <b-list-group>
            <b-list-group-item>
              <strong>디바이스</strong>
              <b-button v-b-modal.device-reg class="mx-2">추가</b-button>
            </b-list-group-item>
            <b-list-group-item
              v-for="(device_item, index) in options.device"
              :key="index"
              >{{ device_item.value }}
              <b-button class="mx-2">수정</b-button>
              <b-button variant="light" class="deleteBtn"
                ><img src="../../assets/bin.png"/></b-button
            ></b-list-group-item>
          </b-list-group>
          <b-form class="my-5" inline> </b-form>
        </b-card>
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
                  >{{ domain_item.value }}</b-list-group-item
                >
              </b-list-group>
              <b-form class="my-5" inline>
                <b-form-input v-model="inputDomain"></b-form-input>
                <b-button class="mx-2" @click="addDomain">도메인 추가</b-button>
                <b-button class="mx-2" @click="deleteDomain"
                  >도메인 제거</b-button
                >
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
                <b-form-select
                  class="mr-5"
                  v-model="selected.domain"
                  :options="options.domain"
                >
                  <template v-slot:first>
                    <b-form-select-option value="null"
                      >도메인 선택</b-form-select-option
                    >
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
      <b-tab title="항목 관리">
        <!-- 표 row별 수정 및 삭제, 조건별 필터 추가 구현 필요 -->
        <div class="w-75 mx-auto">
          <b-form class="my-5" inline>
            <b-form-select
              class="mx-5"
              v-model="selected.domain"
              :options="options.domain"
            >
              <template v-slot:first>
                <b-form-select-option value="null"
                  >도메인 선택</b-form-select-option
                >
              </template>
            </b-form-select>
            <div>
              항목 이름 :
              <b-form-input
                placeholder="추가할 항목 이름 입력"
                class="ml-3"
                v-model="inputTitle"
              ></b-form-input>
            </div>
          </b-form>
          <div>
            <div>
              <b-card-group deck>
                <b-card title="dataset 설정">
                  <b-button v-b-modal.modal-1 class="mx-2"
                    >dataset 설정</b-button
                  >
                  <template v-slot:footer>
                    선택된 Dataset :
                    <span
                      v-for="(dataset_item, index) in selected.dataset"
                      :key="index"
                      >{{ dataset_item }}&nbsp;</span
                    >
                  </template>
                </b-card>

                <b-card title="value 설정">
                  <b-button v-b-modal.modal-2 class="mx-2 mb-3"
                    >value 설정</b-button
                  >
                  <b-form-radio-group
                    id="valTypegroup"
                    v-model="selected.valType"
                    name="radio-valType"
                  >
                    <b-form-radio value="0">누적값</b-form-radio>
                    <b-form-radio value="1">평균값</b-form-radio>
                    <b-form-radio value="2">최대값</b-form-radio>
                    <b-form-radio value="3">최소값</b-form-radio>
                    <b-form-radio value="4">시간별</b-form-radio>
                  </b-form-radio-group>
                  <template v-slot:footer>
                    선택된 Value :
                    <span v-for="value_item in selected.value" :key="value_item"
                      >{{ value_item }}&nbsp;</span
                    >
                    /
                    {{ valTypeParser(selected.valType) }}
                  </template>
                </b-card>
                <b-card title="그래프 설정">
                  <b-button v-b-modal.modal-3 class="mx-2 mb-3"
                    >그래프 표시 범위 설정</b-button
                  >

                  <b-form-select
                    class="my-2"
                    v-model="selected.graphType"
                    :options="options.graphType"
                  >
                    <template v-slot:first>
                      <b-form-select-option value="null"
                        >그래프 선택</b-form-select-option
                      >
                    </template>
                  </b-form-select>

                  <b-form-checkbox
                    id="defaultCheck"
                    v-model="selected.status"
                    name="checkbox-1"
                    value="1"
                    >디폴트 그래프 설정</b-form-checkbox
                  >
                  <template v-slot:footer
                    >선택된 그래프 :
                    {{ graphTypeParser(selected.graphType) }}&nbsp;/&nbsp;{{
                      rangeParser(selected.range)
                    }}</template
                  >
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
      <b-tab title="요청 사항">
        <NoticeComp />
      </b-tab>
      <!-- <b-tab title="모달테스트"></b-tab> -->
    </b-tabs>
    <b-modal id="modal-1" title="dataset 설정" @cancel="resetDataset">
      <b-form-select
        @change="addDataset"
        v-model="dataset"
        :options="options.dataset"
      >
        <template v-slot:first>
          <b-form-select-option value="null">dataset 선택</b-form-select-option>
        </template>
      </b-form-select>
      <b-list-group class="my-3">
        <b-list-group-item>
          <strong>추가 Dataset 목록</strong>
        </b-list-group-item>
        <b-list-group-item
          v-for="dataset_item in selected.dataset"
          :key="dataset_item.loc2"
        >
          {{ dataset_item }}
          <b-button @click="deleteDatasetItem">삭제</b-button>
        </b-list-group-item>
      </b-list-group>
      <b-button class="mx-2" @click="resetDataset">모두 삭제</b-button>
    </b-modal>
    <b-modal id="modal-2" title="value 설정" @cancel="resetValue">
      <b-form-select
        @change="addValue"
        v-model="value"
        :options="options.value"
      >
        <template v-slot:first>
          <b-form-select-option value="null">value 선택</b-form-select-option>
        </template>
      </b-form-select>
      <b-list-group class="my-3">
        <b-list-group-item>
          <strong>추가 Value 목록</strong>
        </b-list-group-item>
        <b-list-group-item
          v-for="value_item in selected.value"
          :key="value_item"
        >
          {{ value_item }}
          <b-button @click="deleteValueItem">삭제</b-button>
        </b-list-group-item>
      </b-list-group>
      <b-button class="mx-2" @click="resetValue">모두 삭제</b-button>
    </b-modal>
    <b-modal id="modal-3" title="range 설정" @cancel="resetValue">
      <b-form-group>
        <b-form-radio-group
          id="rangegroup"
          v-model="selected.range"
          name="radio-range"
        >
          <b-form-radio value="0">연간</b-form-radio>
          <b-form-radio value="1">월간</b-form-radio>
          <b-form-radio value="2">일간</b-form-radio>
          <b-form-radio value="3">하루</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <div v-if="selected.range == '0'">
        <label for="sb-year-start">시작 날짜</label>
        <b-form-spinbutton
          class="my-3"
          id="sb-year-start"
          wrap
          min="2015"
          max="2030"
          placeholder="start year"
        ></b-form-spinbutton>

        <label for="sb-year-end">끝 날짜</label>
        <b-form-spinbutton
          class="my-3"
          id="sb-year-end"
          wrap
          min="2015"
          max="2030"
          placeholder="end year"
        ></b-form-spinbutton>
      </div>
      <div v-if="selected.range == '1'">
        <label for="sb-month-start">시작 날짜</label>
        <b-form-spinbutton
          class="mt-3"
          id="sb-month-start1"
          wrap
          min="2015"
          max="2030"
          placeholder="start year"
        ></b-form-spinbutton>
        <b-form-spinbutton
          class="mb-3"
          id="sb-month-start2"
          wrap
          min="1"
          max="12"
          placeholder="start month"
        ></b-form-spinbutton>

        <label for="sb-month-end">끝 날짜</label>
        <b-form-spinbutton
          class="mt-3"
          id="sb-month-end1"
          wrap
          min="2015"
          max="2030"
          placeholder="end year"
        ></b-form-spinbutton>
        <b-form-spinbutton
          id="sb-month-end2"
          wrap
          min="1"
          max="12"
          placeholder="end month"
        ></b-form-spinbutton>
      </div>
      <div v-if="selected.range == '2'">
        <label for="datepicker1">시작 날짜</label>
        <b-form-datepicker
          class="my-3"
          id="datepicker1"
          placeholder="시작날짜 선택"
          local="en"
        ></b-form-datepicker>

        <label for="datepicker2">끝 날짜</label>
        <b-form-datepicker
          class="my-3"
          id="datepicker2"
          placeholder="끝날짜 선택"
          local="en"
        ></b-form-datepicker>
      </div>
      <div v-if="selected.range == '3'">
        <div>
          <label for="datepicker3">표시 날짜</label>
          <b-form-datepicker
            class="my-3"
            id="datepicker3"
            placeholder="표시날짜 선택"
            local="en"
          ></b-form-datepicker>
        </div>
      </div>
      <div v-else></div>
    </b-modal>
    <b-modal id="device-reg" title="디바이스 정보 입력" @cancel="resetValue">
      <b-form class="my-2" inline
        >시리얼 넘버 :
        <b-form-input
          class="ml-3"
          v-model="inputSerial"
          placeholder="시리얼 넘버"
        ></b-form-input
      ></b-form>
      <b-form class="my-2" inline
        >위치1(건물) :
        <b-form-input
          class="ml-3"
          v-model="inputLoc1"
          placeholder="위치1"
        ></b-form-input
      ></b-form>
      <b-form class="my-2" inline
        >위치2(호수) :
        <b-form-input
          class="ml-3"
          v-model="inputLoc2"
          placeholder="위치2"
        ></b-form-input
      ></b-form>
      <b-form class="my-2" inline
        >제조사 정보 :
        <b-form-input
          class="ml-3"
          v-model="inputManu"
          placeholder="제조사 정보"
        ></b-form-input
      ></b-form>
      <b-form class="my-2" inline>필드 목록 : </b-form>
      <b-form-select
        class="mr-5"
        v-model="selected.savedField"
        :options="options.savedField"
      >
        <template v-slot:first>
          <b-form-select-option value="null"
            >필드 설정값 불러오기</b-form-select-option
          >
        </template>
      </b-form-select>
      <b-button class="ml-3 mt-3" v-b-modal.device-field>필드 추가</b-button>
    </b-modal>
    <b-modal id="device-field" title="디바이스 필드 입력" @cancel="resetValue">
      <b-form class="my-2" inline
        >필드 이름 :
        <b-form-input
          class="ml-3"
          v-model="text"
          placeholder="이름"
        ></b-form-input
      ></b-form>
      <b-form class="my-2" inline
        >필드 단위 :
        <b-form-input
          class="ml-3"
          v-model="text"
          placeholder="단위"
        ></b-form-input
      ></b-form>
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
        "title",
        "dataset",
        "value",
        "valType",
        "graphType",
        "range",
        "status"
      ],
      admin_id: "admin1",
      inputDomain: "",
      inputTitle: "",
      inputJob: "",
      inputSerial: "",
      inputLoc1: "",
      inputLoc2: "",
      inputManu: "",
      dataset: null,
      value: null,
      row: [],
      job: [
        // { domain: "전력세이빙", type: "시설관리처" },
        // { domain: "전력세이빙", type: "총무처" }
      ],
      selected: {
        status: null,
        domain: null,
        dataset: [],
        value: [],
        graphType: null,
        row: [],
        range: null,
        date: { start: null, end: null },
        valType: "",
        savedField: null,
        field: null
      },

      options: {
        savedField: [],
        field: [],
        device: [],
        domain: [],
        dataset: [
          {
            value: { loc1: "신공학관", loc2: "all" },
            text: "신공학관"
          },
          {
            value: { loc1: "신공학관", loc2: "testbed" },
            text: "신공학관_testbed"
          },
          {
            value: { loc1: "신공학관", loc2: "6144" },
            text: "신공학관_6144"
          },
          {
            value: { loc1: "신공학관", loc2: "2113" },
            text: "신공학관_2113"
          },
          {
            value: { loc1: "신공학관", loc2: "3321" },
            text: "신공학관_3321"
          },
          {
            value: { loc1: "신공학관", loc2: "5146" },
            text: "신공학관_5146"
          },
          {
            value: { loc1: "00", loc2: "all" },
            text: "00"
          },
          {
            value: { loc1: "00", loc2: "00" },
            text: "00_00"
          }
        ],
        value: [
          { value: "tmp", text: "tmp" },
          { value: "hmd", text: "hmd" },
          { value: "PM", text: "PM" },
          { value: "elc", text: "elc" }
        ],
        graphType: [
          { value: "1", text: "area" },
          { value: "2", text: "stacked_area" },
          { value: "3", text: "vertical_simple_bar" },
          { value: "4", text: "vertical_grouped_bar" },
          { value: "5", text: "vertical_stacked_bar" },
          { value: "6", text: "horizontal_simple_bar" },
          { value: "7", text: "horizontal_grouped_bar" },
          { value: "8", text: "horizontal_stacked_bar" },
          { value: "9", text: "scatter" },
          { value: "10", text: "donut" },
          { value: "11", text: "line" },
          { value: "12", text: "pie" },
          { value: "13", text: "gauge" },
          { value: "14", text: "meter" }
        ]
      },
      items: [
        {
          domain: "전력세이빙",
          title: "일간 온습도 비교",
          dataset: this.datasetParser([{ loc1: "신공학관", loc2: "testbed" }]),
          value: ["tmp", "hmd"],
          valType: "avg",
          graphType: this.graphTypeParser("9"),
          range: this.rangeParser("2"),
          status: this.statusParser("1")
        },
        // {
        //   domain: "전력세이빙",
        //   title: "월간 습도 비교",
        //   dataset: [{ loc1: "신공학관", loc2: "testbed" }],
        //   value: ["hmd"],
        //   valType: "avg",
        //   graphType: "line",
        //   range: "month",
        //   status: "1"
        // },
        // {
        //   domain: "전력세이빙",
        //   title: "월간 전력량 비교",
        //   dataset: [{ loc1: "신공학관", loc2: "testbed" }],
        //   value: ["elc"],
        //   valType: "sum",
        //   graphType: "line",
        //   range: "month",
        //   status: "1"
        // },
        {
          domain: "전력세이빙",
          title: "강의실별 전력량 비교",
          dataset: this.datasetParser([
            { loc1: "신공학관", loc2: "6144" },
            { loc1: "신공학관", loc2: "2113" },
            { loc1: "신공학관", loc2: "3321" },
            { loc1: "신공학관", loc2: "5146" }
          ]),
          value: ["elc"],
          valType: "sum",
          graphType: "pie",
          range: "none"
        }
      ]
    };
  },
  created() {
    this.getDomain();
    this.getItem();
  },
  methods: {
    getDomain() {
      let tempArr;
      axios
        .get("/api/admin/domain?admin_id=" + this.admin_id)
        .then(r => {
          tempArr = r.data.data;
          for (var n in tempArr) {
            this.options.domain.push({
              value: tempArr[n].user_domain,
              text: tempArr[n].user_domain
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
      let obj = new Object();
      obj = this.options.domain.pop();
      axios
        .delete("/api/admin/domain", {
          data: {
            admin_id: this.admin_id,
            user_domain: obj.value
          },
          withCredentials: true
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(error => {
          console.log(obj);
          this.options.domain.push({
            value: obj.value,
            text: obj.value
          });
          console.log(error.response);
        });
    },
    getItem() {
      let tempArr;
      axios
        .get("/api/admin/graph/item?admin_id=" + this.admin_id)
        .then(r => {
          tempArr = r.data.data;
          for (var n in tempArr) {
            this.items.push({
              domain: "전력세이빙", //tempArr[n].domain,
              title: tempArr[n].title,
              dataset: this.datasetParser(tempArr[n].datasets),
              value: tempArr[n].values,
              valType: tempArr[n].domain, //this.valTypeParser(tempArr[n].valType),
              graphType: this.graphTypeParser(tempArr[n].graphType),
              range: this.rangeParser(tempArr[n].range),
              status: this.statusParser(tempArr[n].status)
            });
          }
        })
        .catch(function(error) {
          console.log(error.response);
        });
    },
    addItem() {
      if (this.selected.domain == null) alert("도메인을 선택해주세요!");
      else if (this.inputTitle == "") alert("항목 이름을 입력해주세요!");
      else if (this.selected.graphType == null)
        alert("그래프 종류를 선택해주세요!");
      else {
        axios
          .post("/api/admin/graph/item", [
            { admin_id: this.admin_id },
            { domain: this.selected.domain },
            { title: this.inputTitle },
            { dataset: { datasets: this.selected.dataset } },
            { value: { values: this.selected.value } },
            { valType: this.selected.valType },
            { graphType: this.selected.graphType },
            { range: this.selected.range },
            { status: this.selected.status }
          ])
          .then(r => {
            console.log(r);
            this.items.push({
              domain: this.selected.domain,
              title: this.inputTitle,
              dataset: this.datasetParser(this.selected.dataset),
              value: this.selected.value,
              valType: this.valTypeParser(this.selected.valType),
              graphType: this.graphTypeParser(this.selected.graphType),
              range: this.rangeParser(this.selected.range),
              status: this.statusParser(this.selected.status)
            });
          })
          .catch(function(error) {
            console.log(error.response);
          });
      }
    },
    deleteItem() {
      let obj = new Object();
      obj = this.items.pop();
      axios
        .delete("/api/admin/graph/item", {
          data: {
            admin_id: this.admin_id,
            title: obj.title
          },
          withCredentials: true
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
          this.options.domain.push(obj);
          console.log(error.response);
        });
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
    },
    statusParser(input) {
      if (input == "1") return "default";
      else return "";
    },
    datasetParser(input) {
      let arr = [];
      for (var n in input) {
        if (input[n].loc2 == "all") arr.push(input[n].loc1);
        else arr.push(input[n].loc1 + "_" + input[n].loc2);
      }
      return arr;
    },
    valTypeParser(input) {
      if (input == "0") return "누적값";
      else if (input == "1") return "평균값";
      else if (input == "2") return "최대값";
      else if (input == "3") return "최소값";
      else if (input == "4") return "시간별";
      else return "";
    },
    rangeParser(input) {
      if (input == "0") return "연간";
      else if (input == "1") return "월간";
      else if (input == "2") return "일간";
      else if (input == "3") return "하루";
      else return "";
    },
    graphTypeParser(input) {
      if (input == "1") return "area";
      else if (input == "2") return "stacked_area";
      else if (input == "3") return "vertical_simple_bar";
      else if (input == "4") return "vertical_grouped_bar";
      else if (input == "5") return "vertical_stacked_bar";
      else if (input == "6") return "horizontal_simple_bar";
      else if (input == "7") return "horizontal_grouped_bar";
      else if (input == "8") return "horizontal_stacked_bar";
      else if (input == "9") return "scatter";
      else if (input == "10") return "donut";
      else if (input == "11") return "line";
      else if (input == "12") return "pie";
      else if (input == "13") return "gauge";
      else if (input == "14") return "meter";
      else return "";
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
.deleteBtn {
  background-color: transparent;
  border-color: transparent;
}
</style>
