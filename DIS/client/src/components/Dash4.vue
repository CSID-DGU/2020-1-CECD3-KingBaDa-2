<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-card>
            <D3BarChart
              :config="barchart_config"
              :datum="barchart_data"
              :title="barchart_title"
              :source="barchart_source"
            ></D3BarChart>
          </b-card>
        </b-col>
        <b-col>
          <b-card>
            <D3LineChart :config="linechart_config" :datum="linechart_data"></D3LineChart>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card>
            <D3PieChart :config="piechart_config" :datum="piechart_data"></D3PieChart>
          </b-card>
        </b-col>
        <b-col>
          <b-card title="전력 사용량 순위">
            <b-table striped hover :items="items"></b-table>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { D3BarChart } from "vue-d3-charts";
import { D3LineChart } from "vue-d3-charts";
import { D3PieChart } from "vue-d3-charts";

export default {
  components: {
    D3BarChart,
    D3PieChart,
    D3LineChart
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
      },
      linechart_data: [
        { hours: 238, production: 134, date: 2000 },
        { hours: 938, production: 478, date: 2001 },
        { hours: 1832, production: 1392, date: 2002 },
        { hours: 2092, production: 2343, date: 2003 },
        { hours: 2847, production: 2346, date: 2004 },
        { hours: 2576, production: 2233, date: 2005 },
        { hours: 2524, production: 2325, date: 2006 },
        { hours: 1648, production: 2456, date: 2007 },
        { hours: 2479, production: 2329, date: 2008 },
        { hours: 3200, production: 2438, date: 2009 }
      ],
      linechart_config: {
        values: ["hours", "production"],
        date: {
          key: "date",
          inputFormat: "%Y",
          outputFormat: "%Y"
        },
        points: true,
        axis: {
          yTicks: 3
        }
      },
      piechart_data: [
        { hours: 20, name: "Lorem" },
        { hours: 30, name: "Ipsum" },
        { hours: 31, name: "Dolor" },
        { hours: 15, name: "Sit" }
      ],
      piechart_config: {
        key: "name",
        value: "hours",
        color: { scheme: "schemeTableau10" },
        radius: { inner: 80 }
      },
      count: 1,
      items: [
        { 순위: 1, 건물: "신공학관", "사용 전력(KW)": 123 },
        { 순위: 2, 건물: "원흥관", "사용 전력(KW)": 56 },
        { 순위: 3, 건물: "혜화관", "사용 전력(KW)": 53 },
        { 순위: 4, 건물: "본관", "사용 전력(KW)": 42 }
      ]
    };
  }
};
</script>

<style scoped>
b.card {
  resize: both;
}
</style>
