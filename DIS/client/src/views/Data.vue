<template>
  <div>
    <p>메타 데이터 다운로드</p>
    <b-row class="w-75 mx-auto frame">
      <b-col>
        파일형식
        <b-form-select
          class="mx-5 mt-4 mb-3"
          v-model="selected.fileType"
          :options="options.fileType"
        >
          <template v-slot:first>
            <b-form-select-option value="null">파일 형식 선택</b-form-select-option>
          </template>
        </b-form-select>건물
        <b-form-select class="mx-5 mt-3" v-model="selected.loc" :options="options.loc">
          <template v-slot:first>
            <b-form-select-option value="null">건물 선택</b-form-select-option>
          </template>
        </b-form-select>
      </b-col>
      <b-col />
      <b-col>
        날짜 설정
        <div>
          <b-form-datepicker class="my-4" id="datepicker1" placeholder="시작날짜 선택" local="en"></b-form-datepicker>

          <b-form-datepicker class="my-5" id="datepicker2" placeholder="끝날짜 선택" local="en"></b-form-datepicker>
        </div>
      </b-col>
    </b-row>
    <button v-b-modal.modal-1>다운로드</button>
    <b-modal id="modal-1" title="다운로드">
      <b-form-file
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Metadata",
  data() {
    return {
      file: null,
      selected: {
        fileType: null,
        loc: null
      },
      options: {
        fileType: [
          { value: "json", text: "JSON" },
          { value: "xml", text: "XML" },
          { value: "csv", text: "CSV" },
          { value: "txt", text: "TEXT" }
        ],
        loc: [
          { value: "신공학관", text: "신공학관" },
          { value: "원흥관", text: "원흥관" }
        ]
      }
    };
  },
  methods: {}
};
</script>

<style scoped>
button {
  margin-top: 200px;
  width: 10%;
  cursor: pointer;
  padding: 10px;
  background-color: #6fcedc;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  outline: 0;
  border: 0;
}
.frame {
  margin-top: 300px;
}
p {
  margin-top: 50px;
  font-weight: bold;
  font-size: 30px;
}
</style>
