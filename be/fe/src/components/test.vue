<template>
    <div id="app">
        <VueDragResize :isActive="false" :x="500" :y="500" :w="200" :h="200" v-on:resizing="resize" v-on:dragging="resize">
          <D3BarChart
            :config="barchart_config"
            :datum="barchart_data"
            :title="barchart_title"
            :source="barchart_source"
          ></D3BarChart>
        </VueDragResize>
    </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize';
import { D3BarChart } from "vue-d3-charts";

export default {
    name: 'app',

    components: {
        D3BarChart,
        VueDragResize
    },

    data() {
        return {
            width: 200,
            height: 200,
            top: 0,
            left: 0,
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
            }
        }
    },

    methods: {
        resize(newRect) {
            this.width = newRect.width;
            this.height = newRect.height;
            this.top = newRect.top;
            this.left = newRect.left;
        }
    }
}
</script>
<style scope>

</style>
