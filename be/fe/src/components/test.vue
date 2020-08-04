<template>
  <div id="app">
    <VueDragResize
      :isActive="true"
      :w="300"
      :h="300"
      v-on:resizing="resize"
      @resizestop="componentKey=!componentKey"
      v-on:dragging="resize"
      @dragstop="componentKey=!componentKey"
    >
      <D3BarChart
        :key="componentKey"
        :config="barchart_config"
        :datum="barchart_data"
        :title="barchart_title"
        :source="barchart_source"
      ></D3BarChart>
    </VueDragResize>
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
      barchart_title: "연간 전력량 비교",
      barchart_source: "전력량(KW)",
      barchart_data: [
        //...
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

  methods: {
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    }
  }
};
</script>