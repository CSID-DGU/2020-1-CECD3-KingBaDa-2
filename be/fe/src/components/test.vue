<template>
  <div>
    <template v-for="count in counts" >
      <VueDragResize
        :isActive="false"
        :w="300"
        :h="300"
        :x="30"
        :y="30"
        dragCancel=".drag"
        v-on:resizing="resize"
        @resizestop="componentKey=!componentKey"
        v-bind:key="count"
      >
        <D3BarChart
          :key="componentKey"
          :config="barchart_config"
          :datum="barchart_data"
          :title="barchart_title"
          :source="barchart_source"
          :height="height-80"
          :v-bind:key="count"

        ></D3BarChart>
      </VueDragResize>
    </template>
    <b-button @click="addGraph">add</b-button>
    <b-button @click="deleteGraph">delete</b-button>
  </div>
</template>

<script>
import VueDragResize from "vue-drag-resize";
import { D3BarChart } from "vue-d3-charts";

export default {
  name: "app",

  components: {
    VueDragResize,
    D3BarChart
  },

  data() {
    return {
      chartID: "",
      counts: 1,
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

      width: 300,
      height: 300,
      top: 0,
      left: 0,
      componentKey: 0
    };
  },
  created(){
    this.$nextTick(function(){
      this.componentKey++
    });
  },
  methods: {
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
    addGraph(){
      if(this.counts<12){
        this.counts++
        this.$nextTick(function(){
          this.componentKey++
        });
      }
    },
    deleteGraph(){
      if(this.counts>0){
        this.counts--
      }
    }
  }
};
</script>
