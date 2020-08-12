<template>
  <div>

    <b-dropdown class="mx-1" right text="add">
      <b-dropdown-item @click="addGraph(1)">area graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(2)">stacked area graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(3)">vertical bar graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(4)">vertical grouped bar graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(5)">vertical stacked bar graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(6)">horizontal stacked bar graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(7)">horizontal grouped bar graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(8)">horizontal stacked bar graph</b-dropdown-item>
      <b-dropdown-item @click="addGraph(10)">pie graph</b-dropdown-item>
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
      <ccv-area-chart :data="graph_data[index].datum" :options="graphs[index].option" v-bind:key="index" v-if="graphs[index].graphType==1"></ccv-area-chart>
      <ccv-stacked-area-chart :data="graph_data[index].datum" :options="graphs[index].option" v-bind:key="index" v-if="graphs[index].graphType==2"></ccv-stacked-area-chart>
      <ccv-simple-bar-chart :data="graph_data[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==3||6"></ccv-simple-bar-chart>
      <ccv-grouped-bar-chart :data="graph_data[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==4||7"></ccv-grouped-bar-chart>
      <ccv-stacked-bar-chart :data="graph_data[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==5||8"></ccv-stacked-bar-chart>
      <ccv-pie-chart :data="graph_data[index].datum" :options="graphs[index].option" v-bind:key="index" v-else-if="graphs[index].graphType==10"></ccv-pie-chart>
      </VueDragResize>
    </div>
    <b-button class="deleteButton" v-bind:key="index" @click="deleteGraph()">delete</b-button>
  </div>
</template>

<script>
import VueDragResize from "vue-drag-resize";
import graphSettings from "@/data/graphSettings.js";

import areaGraphData from "@/data/graphType/areaGraphTest.js";
import stackedAreaGraphData from "@/data/graphType/stackedAreaGraphTest.js";
import verticalBarGraphData from "@/data/graphType/verticalBarGraphTest.js";
import verticalGroupedBarGraphData from "@/data/graphType/veritcalGroupedBarGraphTest.js";
import verticalStackedBarGraphData from "@/data/graphType/verticalStackedBarGraphTest.js";
import horizontalBarGraphData from "@/data/graphType/horizontalBarGraphTest.js";
import horizontalGroupedBarGraphData from "@/data/graphType/horizontalGroupedBarGraphTest.js";
import horizontalStackedBarGraphData from "@/data/graphType/horizontalStackedBarGraphTest.js";
import pieGraphData from "@/data/graphType/pieGraphTest.js";

export default {
  components: {
    VueDragResize
  },

  data() {
    return {
      name: "Dashboard", //페이지 이름
      graphs: [], //그래프 설정
      graph_data: [],
      listWidth: 0, //컨테이너 가로
      listHeight: 0, //컨테이너 세로
      graphType: 0
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
    this.graphs_data = graphSettings.datum;
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
      if(graphType == 1){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: areaGraphData.options
        });
        this.graph_data.push({
          datum: areaGraphData.data
        });
      }
      //stacked area graph
      else if(graphType == 2){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: stackedAreaGraphData.options
        })
        this.graph_data.push({
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
          option: verticalBarGraphData.options
        })
        this.graph_data.push({
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
          option: verticalGroupedBarGraphData.options
        })
        this.graph_data.push({
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
          option: verticalStackedBarGraphData.options
        })
        this.graph_data.push({
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
          option: horizontalBarGraphData.options
        })
        this.graph_data.push({
          datum: horizontalBarGraphData.data
        })
      }
      // vertical grouped bar graph
      else if(graphType == 7){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: horizontalGroupedBarGraphData.options
        })
        this.graph_data.push({
          datum: horizontalGroupedBarGraphData.data
        })
      }
      // vertical stacked bar graph
      else if(graphType == 8){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: horizontalStackedBarGraphData.options
        })
        this.graph_data.push({
          datum: horizontalStackedBarGraphData.data
        })
      }
      // pie graph
      else if(graphType == 10){
        this.graphs.push({
          width: 500,
          height: 400,
          top: Math.floor(Math.random() * 100) + 50,
          left: Math.floor(Math.random() * 100) + 30,
          graphType: graphType,
          option: pieGraphData.options
        });
        this.graph_data.push({
          datum: pieGraphData.data
        });
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
