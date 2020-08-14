<template>
  <div>

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
      </VueDragResize>
    </div>
    <b-button class="deleteButton" @click="deleteGraph()">delete</b-button>
  </div>
</template>

<script>
import VueDragResize from "vue-drag-resize";
import graphSettings from "@/data/graphSettings.js";

import areaGraphData from "@/data/graphType/areaGraphTest.js";
import stackedAreaGraphData from "@/data/graphType/stackedAreaGraphTest.js";
import verticalBarGraphData from "@/data/graphType/verticalBarGraphTest.js";
import verticalGroupedBarGraphData from "@/data/graphType/verticalGroupedBarGraphTest.js"
import verticalStackedBarGraphData from "@/data/graphType/verticalStackedBarGraphTest.js";
import horizontalBarGraphData from "@/data/graphType/horizontalBarGraphTest.js";
import horizontalGroupedBarGraphData from "@/data/graphType/horizontalGroupedBarGraphTest.js"
import horizontalStackedBarGraphData from "@/data/graphType/horizontalStackedBarGraphTest.js";
import bubbleGraphData from "@/data/graphType/bubbleGraphTest.js";
import donutGraphData from "@/data/graphType/donutGraphTest.js";
import lineGraphData from "@/data/graphType/lineGraphTest.js";
import pieGraphData from "@/data/graphType/pieGraphTest.js";
import gaugeGraphData from "@/data/graphType/gaugeGraphTest.js";
import meterGraphData from "@/data/graphType/meterGraphTest.js";
import radarGraphData from "@/data/graphType/radarGraphTest.js";

export default {
  components: {
    VueDragResize
  },

  data() {
    return {
      name: "Dashboard", //페이지 이름
      graphs: [], //그래프 설정
      listWidth: 0, //컨테이너 가로
      listHeight: 0 //컨테이너 세로
    };
  },
  //외부 컨테이너 초기화
  mounted() {
    let listEl = document.getElementById("list");
    this.listWidth = listEl.clientWidth;
    this.listHeight = listEl.clientHeight;
    window.addEventListener("resize", () => {
      this.listWidth = listEl.clientWidth;
      this.listHeight = listEl.clientHeight;
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
      this.graphs[index].option.height = newRect.height;
    },
    //area graph
    addGraph(graphType) {

      //area graph
      if(graphType == 1){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: areaGraphData.options,
          datum: areaGraphData.data
        })
      }

      //stacked area graph
      if(graphType == 2){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: stackedAreaGraphData.options,
          datum: stackedAreaGraphData.data
        })
      }

      // vertical bar graph
      else if(graphType == 3){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: verticalBarGraphData.options,
          datum: verticalBarGraphData.data
        })
      }

      // vertical grouped bar graph
      else if(graphType == 4){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: verticalGroupedBarGraphData.options,
          datum: verticalGroupedBarGraphData.data
        })
      }

      // vertical stacked bar graph
      else if(graphType == 5){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: verticalStackedBarGraphData.options,
          datum: verticalStackedBarGraphData.data
        })
      }

      // horizontal bar graph
      else if(graphType == 6){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: horizontalBarGraphData.options,
          datum: horizontalBarGraphData.data
        })
      }

      // horizontal grouped bar graph
      else if(graphType == 7){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: horizontalGroupedBarGraphData.options,
          datum: horizontalGroupedBarGraphData.data
        })
      }

      // horizontal stacked bar graph
      else if(graphType == 8){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: horizontalStackedBarGraphData.options,
          datum: horizontalStackedBarGraphData.data
        })
      }

      // bubble graph
      else if(graphType == 9){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: bubbleGraphData.options,
          datum: bubbleGraphData.data
        })
      }

      // donut graph
      else if(graphType == 10){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: donutGraphData.options,
          datum: donutGraphData.data
        })
      }

      // line graph
      else if(graphType == 11){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: lineGraphData.options,
          datum: lineGraphData.data
        })
      }

      // pie graph
      else if(graphType == 12){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: pieGraphData.options,
          datum: pieGraphData.data
        })
      }

      // gauge graph
      else if(graphType == 13){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: gaugeGraphData.options,
          datum: gaugeGraphData.data
        })
      }

      // meter graph
      else if(graphType == 14){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: meterGraphData.options,
          datum: meterGraphData.data
        })
      }

      // radar graph
      else if(graphType == 15){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: radarGraphData.options,
          datum: radarGraphData.data
        })
      }

      else{
        console.log("잘못된 그래프");
      }

    },

    deleteGraph() {
      this.graphs = [];
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
</style>
