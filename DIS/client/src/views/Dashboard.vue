<template>
  <div>
    <div class="list" id="list">
      <VueDragResize
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
        @resizestop="componentKey=!componentKey"
        v-bind:key="index"
      >
      <b-button @click="deleteGraph">delete</b-button>
        <D3BarChart
          :key="componentKey"
          :config="barchart_config"
          :datum="barchart_data"
          :title="barchart_title"
          :source="barchart_source"
          :height="graphs[index].height-80"
          :v-bind:key="index"
        ></D3BarChart>
      </VueDragResize>
    </div>
    <b-button @click="addGraph">add</b-button>
  </div>
</template>

<script>
import VueDragResize from "vue-drag-resize";
import { D3BarChart } from "vue-d3-charts";
import graphSets from "@/data/graphTest.js";

export default {
  components: {
    VueDragResize,
    D3BarChart
  },

  data() {
    return {
      chartID: "",
      listWidth: 0,
      listHeight: 0,
      graphs:[],
      barchart_title: "연간 전력량 비교",
      barchart_source: "전력량(KW)",
      barchart_data: [
        { hours: 1648, production: 9613, year: "2007" },
        { hours: 2479, production: 6315, year: "2008" },
        { hours: 3200, production: 2541, year: "2009" }
      ],
      barchart_config: {
        key: "year",
        currentKey: "2004",
        values: ["hours"],
        axis: {
          yTicks: 3
        },
        color: {
          default: "#222f3e",
          current: "#41B882"
        }
      },
      componentKey: 0
    };
  },
  mounted() {
    let listEl = document.getElementById('list');
    this.listWidth = listEl.clientWidth;
    this.listHeight = listEl.clientHeight;
    window.addEventListener('resize', ()=>{
        this.listWidth = listEl.clientWidth;
        this.listHeight = listEl.clientHeight;
    })
  },
  created(){
    this.graphs = graphSets.graphs;
    this.$nextTick(function(){
      this.componentKey++
    });
  },
  methods: {
    resize(newRect, index) {
      this.graphs[index].width = newRect.width;
      this.graphs[index].height = newRect.height;
      this.graphs[index].top = newRect.top;
      this.graphs[index].left = newRect.left;
    },
    addGraph(){
      this.graphs.push({
        'width':500,
        'height':300,
        'top':50,
        'left':30
      });
      this.index++;
      this.$nextTick(function(){
        this.componentKey++;
      });
    },
    deleteGraph(){

      this.index--;
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
  box-shadow: 0 0 2px #AAA;
  background-color: white;
  }
</style>
