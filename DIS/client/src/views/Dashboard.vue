<template>
  <div>
    <div class="title">
      대시보드
    </div>
    <div>
      <b-button class = "listBtn" v-b-toggle.sidebar-right variant="info" style = "width:200px"><img src="../assets/list.png">&nbsp;&nbsp;그래프 목록</b-button>
    </div>
    <b-sidebar id="sidebar-right" title="그래프 목록" right shadow>
      <b-list-group>
        <b-list-group-item v-for="(graph, index) in graphs" v-bind:key="index" class="graphList">
          <b-row>
            <b-col>
              <div class="graphList">
                {{graph.option.title}}
              </div>
            </b-col>
            <b-col cols="3">
              <b-button variant="light" class="deleteBtn" @click="deleteGraph(index)"><img src="../assets/bin.png"></b-button>
            </b-col>
          </b-row>
          </b-list-group-item>
        <b-list-group-item button v-b-modal.addGraph variant="info" style="font-weight:bold"> + 그래프 추가 </b-list-group-item>
      </b-list-group>
    </b-sidebar>
    <div class="list" id="list">
      <VueDragResize
        id="graphContainer"
        v-for="(graph, index) in graphs"
        :isActive="false"
        :w="graph.width"
        :h="graph.height"
        :x="graph.left"
        :y="graph.top"
        :minw="200"
        :minh="200"
        :parentLimitation="true"
        v-on:resizing="resize($event, index)"
        v-bind:key="index"
        snapToGrid="true"
        gridX="50"
        gridY="50"
      >
      <div class="graphContainer">
        <ccv-area-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-if="graphs[index].graphType==1"></ccv-area-chart>
        <ccv-stacked-area-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==2"></ccv-stacked-area-chart>
        <ccv-simple-bar-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==3||graphs[index].graphType==6"></ccv-simple-bar-chart>
        <ccv-grouped-bar-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==4||graphs[index].graphType==7"></ccv-grouped-bar-chart>
        <ccv-stacked-bar-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==5||graphs[index].graphType==8"></ccv-stacked-bar-chart>
        <ccv-scatter-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==9"></ccv-scatter-chart>
        <ccv-donut-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==10"></ccv-donut-chart>
        <ccv-line-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==11"></ccv-line-chart>
        <ccv-pie-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==12"></ccv-pie-chart>
        <ccv-gauge-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==13"></ccv-gauge-chart>
        <ccv-meter-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==14"></ccv-meter-chart>
      </div>
      </VueDragResize>
    </div>
    <b-modal id="addGraph" centered title="그래프 추가">
        <b-dropdown :text="dropdownText" block menu-class="w-100">
          <b-dropdown-item v-for="(item, index) in items" v-bind:key="index" @click="modalItemClick(item)">{{item.title}}</b-dropdown-item>
        </b-dropdown>
      <template v-slot:modal-footer="{cancel}">
        <b-button size="sm" variant="success" @click="addGraph(graphType)"> 그래프 생성 </b-button>
        <b-button size="sm" variant="outline-secondary" @click="cancel"> 닫기 </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import VueDragResize from "vue-drag-resize";

// //import areaGraphData from "@/data/graphType/areaGraphTest.js";
// import stackedAreaGraphData from "@/data/graphType/stackedAreaGraphTest.js";
import verticalBarGraphData from "@/data/graphType/verticalBarGraphTest.js";
// import verticalGroupedBarGraphData from "@/data/graphType/verticalGroupedBarGraphTest.js";
// import verticalStackedBarGraphData from "@/data/graphType/verticalStackedBarGraphTest.js";
// import horizontalBarGraphData from "@/data/graphType/horizontalBarGraphTest.js";
// import horizontalGroupedBarGraphData from "@/data/graphType/horizontalGroupedBarGraphTest.js";
// import horizontalStackedBarGraphData from "@/data/graphType/horizontalStackedBarGraphTest.js";
// import scatterGraphData from "@/data/graphType/scatterGraphTest.js";
// import donutGraphData from "@/data/graphType/donutGraphTest.js";
// //import lineGraphData from "@/data/graphType/lineGraphTest.js";
import pieGraphData from "@/data/graphType/pieGraphTest.js";
import gaugeGraphData from "@/data/graphType/gaugeGraphTest.js";
// import meterGraphData from "@/data/graphType/meterGraphTest.js";

import axios from 'axios';

export default {
  components: {
    VueDragResize
  },

  data() {
    return {
      name: "Dashboard", //페이지 이름
      graphs: [], //그래프 리스트
      listWidth: 0, //컨테이너 가로
      listHeight: 0, //컨테이너 세로
      graphTitle: "", //그래프 제목
      graphType: 1, //그래프 타입
      TCO: null, //제목 변경된 그래프 옵션
      dropdownText: "그래프 선택",
      listContents:[],
      datum: [],
      clickedItem: null,
      clickedFlag: false, // 그래프 생성 시 선택하는 행동 말고 다른 행동들은 인식하지 않도록 하기 위한 flag
      items:[
        {
          title : "실시간 전력사용량",
          valType : "test",
          loc1 : "00",
          loc2 : "00",
          graphType : 11,
          value : ["temp"],
          range : 0,
          status : "test"
        }
      ],

    };
  },

  mounted() {
    //외부 컨테이너 초기화
    let listEl = document.getElementById("list");
    this.listWidth = listEl.clientWidth;
    this.listHeight = listEl.clientHeight;
    window.addEventListener("resize", () => {
      this.listWidth = listEl.clientWidth;
      this.listHeight = listEl.clientHeight;
    });

    this.getItem();

    this.graphs.push({
      width: 300,
      height: 200,
      top: 50,
      left: 100,
      graphType: 13,
      option: gaugeGraphData.options,
      datum: gaugeGraphData.data
    });

    this.graphs.push({
      width: 500,
      height: 500,
      top: 300,
      left: 100,
      graphType: 5,
      option: verticalBarGraphData.options,
      datum: verticalBarGraphData.data
    });

    this.graphs.push({
      width: 500,
      height: 400,
      top: 400,
      left: 800,
      graphType: 12,
      option: pieGraphData.options,
      datum: pieGraphData.data
    });

    //[{name:"elc1"},{date:{"gte":"2020-01-01","lte":"2020-01-02"}}]

    //complete
    // let dt = {key:"name,temp,humid,co2,date,elec", or:[],and:[{name:"integrated_sensor1"}]};
    // this.elastic_complete_model(dt);

  },

  updated(){
    this.makeDatum_complete(this.items[0]);



    if(this.clickedFlag){
      this.datum = [];
      if(this.clickedItem.graphType == 1 || this.clickedItem.graphType == 2 || this.clickedItem.graphType == 9 || this.clickedItem.graphType == 11){
        this.elastic_complete_model(this.makeDatum_complete(this.clickedItem));
      }
      else if(this.clickedItem.graphType == 4 || this.clickedItem.graphType == 5 || this.clickedItem.graphType == 7 || this.clickedItem.graphType == 8){
        this.elastic_cal(this.makeDatum_cal(this.clickedItem));
      }
      else{
        if(this.clickedItem.valType == "avg"){
          this.elastic_cal_avg(this.makeDatum_cal(this.clickedItem));
        }
        else if(this.clickedItem.valType == "sum"){
          this.elastic_cal_sum(this.makeDatum_cal(this.clickedItem));
        }
        else if(this.clickedItem.valType == "min"){
          this.elastic_cal_min(this.makeDatum_cal(this.clickedItem));
        }
        else if(this.clickedItem.valType == "max"){
          this.elastic_cal_max(this.makeDatum_cal(this.clickedItem));
        }
        else{
          console.log("잘못된 항목");
        }
      }
      this.clickedFlag = false;
    }
  },

  methods: {
        getItem() {
            axios.get("/api/admin/graph/item?admin_id=admin1")
            .then((r) => {
              r.data.data.forEach(data => {

                let object = new Object();
                object.title = data.title;
                object.valType = data.domain;
                object.loc1 = data.datasets[0].loc1;
                object.loc2 = data.datasets[0].loc2;
                object.graphType = data.graphType;
                object.value = data.values;
                object.range = data.range;
                object.status = data.status;

                this.items.push(object);

              })
            })
          },

      //{key:"name,value", or:[{name:"elc1,elc2"}],and:[{loc1:"00"},{date:{"gte":"2020-01-01","lte":"2020-01-02"}}]}
      //elastic-complete용 axios 삽입 데이터 형식 만들기 (valType이 "time" 일때)
        makeDatum_complete(itemConfig){
          let dt = new Object();
          let modelObject = new Object();
          let orArr = new Array();
          let andArr = new Array();
          let modelStr = '';
          // itemConfig.value.forEach(data => {
          //   nameStr = nameStr.concat(data,'1,');
          // })
          // modelObject.name = nameStr;
          // orArr.push(modelObject);
          itemConfig.value.forEach(data =>{
            modelStr = modelStr.concat(data,',');
          })
          modelObject.model = "integrated";
          orArr.push(modelObject);

          if(itemConfig.loc1 != "all"){
            let loc1Object = new Object();
            loc1Object.loc1 = itemConfig.loc1;
            andArr.push(loc1Object);

            if(itemConfig.loc2 != "all"){
              let loc2Object = new Object();
              loc2Object.loc2 = itemConfig.loc2;
              andArr.push(loc2Object);
            }
            let dateObject = new Object();
            dateObject.date = {"gte":"2020-11-25","lte":"2020-11-25"};

            andArr.push(dateObject);
          }

          dt.key = "name,date,value,temp,humid,co2";
          dt.or = orArr;
          dt.and = andArr;
          return dt;
        },


      //elastic-cal용 axios 삽입 데이터 형식 만들기 (valType이 "time" 아니고 key가 없을 때)
        makeDatum_cal(itemConfig){
          let dt = [];
          let loc1Arr = ["00","01","02"];
          loc1Arr.forEach(data => {
            let df = new Array();
            let loc1Object = new Object();
            let modelObject = new Object();
            let dateObject = new Object();

            loc1Object.loc1 = data;
            modelObject.model = itemConfig.value[0];
            dateObject.date = {"gte":"2020-01-01","lte":"2020-01-02"};
            df.push(loc1Object);
            df.push(modelObject);
            df.push(dateObject);
            dt.push(df);
          })
          return dt;
        },

    //센서 종류별로 데이터 받아오기
    elastic_complete_model(dt){
      // 데이터 받아오기
      axios.post("/api/elastic/elastic-complete", dt)
      .then((r) => {
        console.log(r);
        let datumArray = new Array();
        r.data.forEach(data => {
          let tempObject = new Object();
          tempObject.group = "신공학관";
          tempObject.date = data.date;
          tempObject.value = data.temp;
          datumArray.push(tempObject);


          let humidObject = new Object();
          humidObject.group = "원흥관";
          humidObject.date = data.date;
          humidObject.value = data.humid;
          datumArray.push(humidObject);
        })
        this.datum = datumArray.sort((function(a,b){return new Date(b.date) - new Date(a.date)}));
      })
      .catch(function (error){
        console.log(error.response);
      });
    },

    // min, max, avg, sum을 key로 만들어서 데이터 만들기
    elastic_cal(dt){
      // 데이터 받아오기
      dt.forEach(data => {
        axios.post("/api/elastic/elastic-cal", data)
        .then((r) => {
          let minObject = new Object();
          let maxObject = new Object();
          let avgObject = new Object();
          let sumObject = new Object();

          minObject.group = data[0].loc1;
          minObject.key = "min";
          minObject.value = r.data.min;
          this.datum.push(minObject);

          maxObject.group = data[0].loc1;
          maxObject.key = "max";
          maxObject.value = r.data.max;
          this.datum.push(maxObject);

          avgObject.group = data[0].loc1;
          avgObject.key = "avg";
          avgObject.value = r.data.avg;
          this.datum.push(avgObject);

          sumObject.group = data[0].loc1;
          sumObject.key = "sum";
          sumObject.value = r.data.sum;
          this.datum.push(sumObject);
        })
        .catch(function (error){
          console.log(error.response);
        });
      })
    },


    //일정 기간동안 센서 종류별로 계산된 최소값 받아오기
    elastic_cal_min(dt){
      // 데이터 받아오기
      dt.forEach(data => {
        axios.post("/api/elastic/elastic-cal", data)
        .then((r) => {
          let object = new Object();
          object.group = data[0].loc1;
          object.value = r.data.max;
          this.datum.push(object);
        })
        .catch(function (error){
          console.log(error.response);
        });
      })
    },

    //일정 기간동안 센서 이름별로 계산된 최대값 받아오기
    elastic_cal_max(dt){
      // 데이터 받아오기
      dt.forEach(data => {
        axios.post("/api/elastic/elastic-cal", data)
        .then((r) => {
          let object = new Object();
          object.group = data[0].loc1;
          object.value = r.data.max;
          this.datum.push(object);
        })
        .catch(function (error){
          console.log(error.response);
        });
      })
    },

    //일정 기간동안 센서 이름별로 계산된 평균값 받아오기
    elastic_cal_avg(dt){
      // 데이터 받아오기
      dt.forEach(data => {
        axios.post("/api/elastic/elastic-cal", data)
        .then((r) => {
          let object = new Object();
          object.group = data[0].loc1;
          object.value = r.data.avg;
          this.datum.push(object);
        })
        .catch(function (error){
          console.log(error.response);
        });
      })
    },

    //일정 기간동안 센서 이름별로 계산된 누적값 받아오기
    elastic_cal_sum(dt){
      // 데이터 받아오기
      dt.forEach(data => {
        axios.post("/api/elastic/elastic-cal", data)
        .then((r) => {
          let object = new Object();
          object.group = data[0].loc1;
          object.value = r.data.sum;
          this.datum.push(object);
        })
        .catch(function (error){
          console.log(error.response);
        });
      })
    },

    resize(newRect, index) {
      this.graphs[index].width = newRect.width;
      this.graphs[index].height = newRect.height;
      this.graphs[index].top = newRect.top;
      this.graphs[index].left = newRect.left;
    },

    modalItemClick(item){
      this.dropdownText = item.title;
      this.graphTitle = item.title;
      this.graphType = item.graphType;
      this.clickedItem = item;
      this.clickedFlag = true;
    },

    // 그래프 추가
    addGraph(graphType) {
      console.log(this.datum);
      //area graph
      if(graphType == 1){
        this.TCO =  {
          "title": this.graphTitle,
          "axes": {
            "bottom": {
              "mapsTo": "date",
              "scaleType": "time"
            },
            "left": {
              "mapsTo": "value",
              "scaleType": "linear"
            }
          },
          "curve": "curveNatural",
          "points":{
            "radius": "0",
          },
          "width": "100%",
          "height": "400"
        };
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: this.datum
        })
      }

      //stacked area graph
      else if(graphType == 2){
        this.TCO = {
          "title": this.graphTitle,
          "axes": {
            "left": {
              "stacked": true,
              "mapsTo": "value"
            },
            "bottom": {
              "scaleType": "time",
              "mapsTo": "date"
            }
          },
          "curve": "curveMonotoneX",
          "points":{
            "radius": "0",
          },
          "width": "100%",
          "height": "400"
        };
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: this.datum,
        });
      }

      // vertical bar graph
      else if(graphType == 3){
        this.TCO = {
          "title": this.graphTitle,
          "axes": {
            "left": {
              "mapsTo": "value"
            },
            "bottom": {
              "mapsTo": "group",
              "scaleType": "labels"
            }
          },
          "width": "100%",
          "height": "400"
        };
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: this.datum,
        });
      }

      // vertical grouped bar graph
      else if(graphType == 4){
        this.TCO = {
          "title": this.graphTitle,
          "axes": {
            "left": {
              "mapsTo": "value"
            },
            "bottom": {
              "scaleType": "labels",
              "mapsTo": "key"
            }
          },
          "width": "100%",
          "height": "400"
        };
        this.TCO.title = this.graphTitle;
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: this.datum,
        });
      }

      // vertical stacked bar graph
      else if(graphType == 5){
        this.TCO = {
          "title": this.graphTitle,
          "axes": {
            "left": {
              "mapsTo": "value",
              "stacked": true
            },
            "bottom": {
              "mapsTo": "key",
              "scaleType": "labels"
            }
          },
          "width": "100%",
          "height": "400"
        };
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: this.datum,
        });
      }

      // horizontal bar graph
      else if(graphType == 6){
        this.TCO = {
          "title": this.graphTitle,
          "axes": {
            "left": {
              "mapsTo": "group",
              "scaleType": "labels"
            },
            "bottom": {
              "mapsTo": "value"
            }
          },
          "width": "100%",
          "height": "400"
        };
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: this.datum,
        });
      }

      // horizontal grouped bar graph
      else if(graphType == 7){
        this.TCO = {
          "title": this.graphTitle,
          "axes": {
            "left": {
              "scaleType": "labels",
              "mapsTo": "key"
            },
            "bottom": {
              "mapsTo": "value"
            }
          },
          "width": "100%",
          "height": "400"
        };
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: this.datum,
        });
      }

      // horizontal stacked bar graph
      else if(graphType == 8){
        this.TCO = {
          "title": this.graphTitle,
          "axes": {
            "left": {
              "scaleType": "labels",
              "mapsTo": "key"
            },
            "bottom": {
              "stacked": true,
              "mapsTo": "value"
            }
          },
          "width": "100%",
          "height": "400"
        };
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: this.datum,
        });
      }

      // scatter graph
      else if(graphType == 9){
        this.TCO = {
          "title": this.graphTitle,
          "axes": {
            "bottom": {
              "scaleType": "time",
              "mapsTo": "date"
            },
            "left": {
              "mapsTo": "value"
            }
          },
          "width": "100%",
          "height": "400"
        }
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: this.datum,
        });
      }

      // donut graph
      else if(graphType == 10){
        this.TCO = {
          "title": this.graphTitle,
          "resizable": true,
          "legend": {
            "alignment": "center"
          },
          "donut": {
            "center": {
              "label": "Browsers"
            },
            "alignment": "center"
          },
          "width": "100%",
          "height": "400"
        };
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: this.datum,
        });
      }

      // line graph
      else if(graphType == 11){
        this.TCO = {
          "title": this.graphTitle,
          "axes": {
            "bottom": {
              "mapsTo": "date",
              "scaleType": "time"
            },
            "left": {
              "mapsTo": "value",
              "scaleType": "linear"
            }
          },
          "curve": "curveMonotoneX",
          "points":{
            "radius": "0",
          },
          "width": "100%",
          "height": "400"
        };
        this.graphs.push({
          width: 500,
          height: 400,
          top: 50,
          left: 800,
          graphType: graphType,
          option: this.TCO,
          datum: this.datum
        })
      }

      // pie graph
      else if(graphType == 12){
        this.TCO = {
          "title": this.graphTitle,
          "resizable": true,
          "legend": {
            "alignment": "center"
          },
          "pie": {
            "alignment": "center"
          },
          "width": "100%",
          "height": "400"
        };
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: this.datum
        });
      }

      // gauge graph
      else if(graphType == 13){
        this.TCO = {
          "title": this.graphTitle,
          "resizable": true,
          "height": "250",
          "width": "100%",
          "gauge": {
            "type": "semi",
            "status": "danger"
          }
        };
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: this.datum
        });
      }

      // meter graph
      else if(graphType == 14){
        this.TCO = {
          "title": this.graphTitle,
          "meter": {
            "peak": 80,
            "status": {
              "ranges": [
                {
                  "range": [
                    0,
                    50
                  ],
                  "status": "success"
                },
                {
                  "range": [
                    50,
                    70
                  ],
                  "status": "warning"
                },
                {
                  "range": [
                    70,
                    100
                  ],
                  "status": "danger"
                }
              ]
            }
          },
          "width": "100%",
          "height": "100"
        };
        this.graphs.push({
          width: 500,
          height: 100,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: this.datum
        });
      }

      else{
        console.log("잘못된 그래프");
      }
    },

    deleteGraph(index) {
      this.graphs.splice(index, 1);
    }
  }
};
</script>
<style scope>
.list {
  position: absolute;
  top: 80px;
  bottom: 20px;
  left: 120px;
  right: 20px;
  box-shadow: 0 0 2px #aaa;
  background-color: white;
}
.listBtn{
  float:right;
  font-weight:bold;
  font-size: 20px;
  margin: -15px 20px 0px 0px;
}
.graphContainer{
  position: relative;
  width: 100%;
  height: 95%;
}
.graphList{
  position: relative;
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 15px;
}
.deleteBtn{
  background-color: transparent;
  border-color: transparent;
}
.title{
  color: #6FCEDC;
  font-size: 30px;
  font-weight: bold;
}
</style>
