<template>
  <div>
    <D3BarChart
      :config="barchart_config"
      :datum="barchart_data"
      :title="barchart_title"
      :source="barchart_source"
    ></D3BarChart>
  </div>
</template>

<script>
import { D3BarChart } from "vue-d3-charts";

export default {
  components: {
    D3BarChart
  },

  data() {
    return {
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
      }
    };
  }
};
</script>

<style scoped>

</style>
