<template>
  <div>
<<<<<<< HEAD
=======
    <b-dropdown class="mx-1" right text="add">
      <b-dropdown-item @click="addGraph(1)">area graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(2)">stacked area graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(3)">vertical bar graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(4)">vertical grouped bar graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(5)">vertical stacked bar graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(6)">horizontal bar graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(7)">horizontal grouped bar graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(8)">horizontal stacked bar graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(9)">bubble graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(10)">donut graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(11)">line graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(12)">pie graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(13)">gauge graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(14)">meter graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(15)">radar graph</b-dropdown-item>
    </b-dropdown>
>>>>>>> 950fe6b8eae85ac7afc34144639c56959b7630c6
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
      >
<<<<<<< HEAD
      <div class="graphContainer">
        <ccv-area-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-if="graphs[index].graphType==1"></ccv-area-chart>
        <ccv-stacked-area-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==2"></ccv-stacked-area-chart>
        <ccv-simple-bar-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==3||graphs[index].graphType==6"></ccv-simple-bar-chart>
        <ccv-grouped-bar-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==4||graphs[index].graphType==7"></ccv-grouped-bar-chart>
        <ccv-stacked-bar-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==5||graphs[index].graphType==8"></ccv-stacked-bar-chart>
        <ccv-bubble-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==9"></ccv-bubble-chart>
        <ccv-donut-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==10"></ccv-donut-chart>
        <ccv-line-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==11"></ccv-line-chart>
        <ccv-pie-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==12"></ccv-pie-chart>
        <ccv-gauge-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==13"></ccv-gauge-chart>
        <ccv-meter-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==14"></ccv-meter-chart>
        <ccv-radar-chart :data="graphs[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==15"></ccv-radar-chart>
      </div>
=======
        <ccv-area-chart
          :data="graphs[index].datum"
          :options="graphs[index].option"
          v-bind:key="index"
          v-if="graphs[index].graphType==1"
        ></ccv-area-chart>
        <ccv-stacked-area-chart
          :data="graphs[index].datum"
          :options="graphs[index].option"
          v-bind:key="index"
          v-else-if="graphs[index].graphType==2"
        ></ccv-stacked-area-chart>
        <ccv-simple-bar-chart
          :data="graphs[index].datum"
          :options="graphs[index].option"
          v-bind:key="index"
          v-else-if="graphs[index].graphType==3||graphs[index].graphType==6"
        ></ccv-simple-bar-chart>
        <ccv-grouped-bar-chart
          :data="graphs[index].datum"
          :options="graphs[index].option"
          v-bind:key="index"
          v-else-if="graphs[index].graphType==4||graphs[index].graphType==7"
        ></ccv-grouped-bar-chart>
        <ccv-stacked-bar-chart
          :data="graphs[index].datum"
          :options="graphs[index].option"
          v-bind:key="index"
          v-else-if="graphs[index].graphType==5||graphs[index].graphType==8"
        ></ccv-stacked-bar-chart>
        <ccv-bubble-chart
          :data="graphs[index].datum"
          :options="graphs[index].option"
          v-bind:key="index"
          v-else-if="graphs[index].graphType==9"
        ></ccv-bubble-chart>
        <ccv-donut-chart
          :data="graphs[index].datum"
          :options="graphs[index].option"
          v-bind:key="index"
          v-else-if="graphs[index].graphType==10"
        ></ccv-donut-chart>
        <ccv-line-chart
          :data="graphs[index].datum"
          :options="graphs[index].option"
          v-bind:key="index"
          v-else-if="graphs[index].graphType==11"
        ></ccv-line-chart>
        <ccv-pie-chart
          :data="graphs[index].datum"
          :options="graphs[index].option"
          v-bind:key="index"
          v-else-if="graphs[index].graphType==12"
        ></ccv-pie-chart>
        <ccv-gauge-chart
          :data="graphs[index].datum"
          :options="graphs[index].option"
          v-bind:key="index"
          v-else-if="graphs[index].graphType==13"
        ></ccv-gauge-chart>
        <ccv-meter-chart
          :data="graphs[index].datum"
          :options="graphs[index].option"
          v-bind:key="index"
          v-else-if="graphs[index].graphType==14"
        ></ccv-meter-chart>
        <ccv-radar-chart
          :data="graphs[index].datum"
          :options="graphs[index].option"
          v-bind:key="index"
          v-else-if="graphs[index].graphType==15"
        ></ccv-radar-chart>
>>>>>>> 950fe6b8eae85ac7afc34144639c56959b7630c6
      </VueDragResize>
    </div>
    <b-container fluid>
      <b-row>
        <b-col></b-col>
        <b-col></b-col>
        <b-col>
          <b-button v-b-toggle.sidebar-right size="lg">그래프 목록</b-button>
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
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="addGraph" centered title="그래프 추가">
        <b-dropdown :text="dropdownText" block menu-class="w-100">
          <b-dropdown-item v-for="(item, index) in items" v-bind:key="index" @click="modalItemClick(item.title, item.graphType)">{{item.title}}</b-dropdown-item>
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
import graphSettings from "@/data/graphSettings.js";

//import areaGraphData from "@/data/graphType/areaGraphTest.js";
import stackedAreaGraphData from "@/data/graphType/stackedAreaGraphTest.js";
import verticalBarGraphData from "@/data/graphType/verticalBarGraphTest.js";
import verticalGroupedBarGraphData from "@/data/graphType/verticalGroupedBarGraphTest.js";
import verticalStackedBarGraphData from "@/data/graphType/verticalStackedBarGraphTest.js";
import horizontalBarGraphData from "@/data/graphType/horizontalBarGraphTest.js";
import horizontalGroupedBarGraphData from "@/data/graphType/horizontalGroupedBarGraphTest.js";
import horizontalStackedBarGraphData from "@/data/graphType/horizontalStackedBarGraphTest.js";
import bubbleGraphData from "@/data/graphType/bubbleGraphTest.js";
import donutGraphData from "@/data/graphType/donutGraphTest.js";
//import lineGraphData from "@/data/graphType/lineGraphTest.js";
import pieGraphData from "@/data/graphType/pieGraphTest.js";
import gaugeGraphData from "@/data/graphType/gaugeGraphTest.js";
import meterGraphData from "@/data/graphType/meterGraphTest.js";

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
      graphType: 0, //그래프 타입
      TCO: null, //제목 변경된 그래프 옵션
      dropdownText: "그래프 선택",
      listContents:[],
      datum: [],
      items:[
        {'title': '센서별',
         'graphType': 11},
        {'title': '강의실 별 전력 사용량 비교',
         'graphType': 1},
        {'title': '온도',
         'graphType': 1}
      ]
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

    // 데이터 받아오기
    let dt = {key:"model,date,value", search:[{loc2:"00"}]}

    axios.post("/api/elastic/get2", dt)
    .then((r) => {
      let datumArray = new Array();
      r.data.forEach(function(data){
        let object = new Object();
        object.group = data.model;
        object.date = data.date;
        object.value = data.value;
        datumArray.push(object);
      })
      this.datum = datumArray.sort((function(a,b){return new Date(b.date) - new Date(a.date)}));
    })
    .catch(function (error){
      console.log(error.response);
    });

  },
  created() {
    this.graphs = graphSettings.graphs;
  },

  methods: {
    resize(newRect, index) {
      this.graphs[index].width = newRect.width;
      this.graphs[index].height = newRect.height;
      this.graphs[index].top = newRect.top;
      this.graphs[index].left = newRect.left;
    },

    modalItemClick(title, graphType){
      this.dropdownText = title;
      this.graphTitle = title;
      this.graphType = graphType;
    },

    //area graph
    addGraph(graphType) {
      //area graph
<<<<<<< HEAD
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
          "height": "400"
        };
=======
      if (graphType == 1) {
>>>>>>> 950fe6b8eae85ac7afc34144639c56959b7630c6
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
<<<<<<< HEAD
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
          "height": "400"
        };
=======
          option: areaGraphData.options,
          datum: areaGraphData.data
        });
      }

      //stacked area graph
      if (graphType == 2) {
>>>>>>> 950fe6b8eae85ac7afc34144639c56959b7630c6
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: stackedAreaGraphData.data
        });
      }

      // vertical bar graph
<<<<<<< HEAD
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
          "height": "400"
        };
=======
      else if (graphType == 3) {
>>>>>>> 950fe6b8eae85ac7afc34144639c56959b7630c6
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: verticalBarGraphData.data
        });
      }

      // vertical grouped bar graph
<<<<<<< HEAD
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
          "height": "400"
        };
        this.TCO.title = this.graphTitle;
=======
      else if (graphType == 4) {
>>>>>>> 950fe6b8eae85ac7afc34144639c56959b7630c6
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: verticalGroupedBarGraphData.data
        });
      }

      // vertical stacked bar graph
<<<<<<< HEAD
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
          "height": "400"
        };
=======
      else if (graphType == 5) {
>>>>>>> 950fe6b8eae85ac7afc34144639c56959b7630c6
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: verticalStackedBarGraphData.data
        });
      }

      // horizontal bar graph
<<<<<<< HEAD
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
          "height": "400"
        };
=======
      else if (graphType == 6) {
>>>>>>> 950fe6b8eae85ac7afc34144639c56959b7630c6
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: horizontalBarGraphData.data
        });
      }

      // horizontal grouped bar graph
<<<<<<< HEAD
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
          "height": "400"
        };
=======
      else if (graphType == 7) {
>>>>>>> 950fe6b8eae85ac7afc34144639c56959b7630c6
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: horizontalGroupedBarGraphData.data
        });
      }

      // horizontal stacked bar graph
<<<<<<< HEAD
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
          "height": "400"
        };
=======
      else if (graphType == 8) {
>>>>>>> 950fe6b8eae85ac7afc34144639c56959b7630c6
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: horizontalStackedBarGraphData.data
        });
      }

      // bubble graph
<<<<<<< HEAD
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
          "bubble": {
            "radiusMapsTo": "surplus"
          },
          "height": "400"
        };
=======
      else if (graphType == 9) {
>>>>>>> 950fe6b8eae85ac7afc34144639c56959b7630c6
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: bubbleGraphData.data
        });
      }

      // donut graph
<<<<<<< HEAD
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
          "height": "400"
        };
=======
      else if (graphType == 10) {
>>>>>>> 950fe6b8eae85ac7afc34144639c56959b7630c6
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: donutGraphData.data
        });
      }

      // line graph
<<<<<<< HEAD
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
          "height": "400"
        };
=======
      else if (graphType == 11) {
>>>>>>> 950fe6b8eae85ac7afc34144639c56959b7630c6
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
<<<<<<< HEAD
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
          "height": "400"
        };
=======
          option: lineGraphData.options,
          datum: lineGraphData.data
        });
      }

      // pie graph
      else if (graphType == 12) {
>>>>>>> 950fe6b8eae85ac7afc34144639c56959b7630c6
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: pieGraphData.data
        });
      }

      // gauge graph
<<<<<<< HEAD
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
=======
      else if (graphType == 13) {
>>>>>>> 950fe6b8eae85ac7afc34144639c56959b7630c6
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: gaugeGraphData.data
        });
      }

      // meter graph
<<<<<<< HEAD
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
          "height": "100"
        };
=======
      else if (graphType == 14) {
>>>>>>> 950fe6b8eae85ac7afc34144639c56959b7630c6
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: this.TCO,
          datum: meterGraphData.data
        });
      }

<<<<<<< HEAD
      else{
=======
      // radar graph
      else if (graphType == 15) {
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: radarGraphData.options,
          datum: radarGraphData.data
        });
      } else {
>>>>>>> 950fe6b8eae85ac7afc34144639c56959b7630c6
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
  top: 50px;
  bottom: 30px;
  left: 160px;
  right: 30px;
  box-shadow: 0 0 2px #aaa;
  background-color: white;
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

</style>
