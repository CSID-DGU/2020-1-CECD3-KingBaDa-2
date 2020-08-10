<template>
  <div>
    <div class="list" id="list">
      <template v-for="count in counts">
        <VueDragResize
          :isActive="false"
          :w="300"
          :h="300"
          :x="30"
          :y="30"
          :parentW="listWidth"
          :parentH="listHeight"
          :parentLimitation="true"
          v-on:resizing="resize"
          @resizestop="componentKey=!componentKey"
          v-bind:key="count"
        >
          <ccv-area-chart :data="data" :options="options"></ccv-area-chart>
        </VueDragResize>
      </template>
    </div>
    <b-button @click="addGraph">add</b-button>
    <b-button @click="deleteGraph">delete</b-button>
  </div>
</template>

<script>
import VueDragResize from "vue-drag-resize";

export default {
  components: {
    VueDragResize
  },

  data() {
    return {
      data: [
        {
          group: "Dataset 1",
          date: "2018-12-31T15:00:00.000Z",
          value: 0
        },
        {
          group: "Dataset 1",
          date: "2019-01-05T15:00:00.000Z",
          value: -37312
        },
        {
          group: "Dataset 1",
          date: "2019-01-07T15:00:00.000Z",
          value: -22392
        },
        {
          group: "Dataset 1",
          date: "2019-01-14T15:00:00.000Z",
          value: -52576
        },
        {
          group: "Dataset 1",
          date: "2019-01-18T15:00:00.000Z",
          value: 20135
        },
        {
          group: "Dataset 2",
          date: "2018-12-31T15:00:00.000Z",
          value: 47263
        },
        {
          group: "Dataset 2",
          date: "2019-01-04T15:00:00.000Z",
          value: 14178
        },
        {
          group: "Dataset 2",
          date: "2019-01-07T15:00:00.000Z",
          value: 23094
        },
        {
          group: "Dataset 2",
          date: "2019-01-12T15:00:00.000Z",
          value: 45281
        },
        {
          group: "Dataset 2",
          date: "2019-01-18T15:00:00.000Z",
          value: -63954
        }
      ],
      options: {
        title: "Area (time series - natural curve)",
        axes: {
          bottom: {
            title: "2019 Annual Sales Figures",
            mapsTo: "date",
            scaleType: "time"
          },
          left: {
            mapsTo: "value",
            scaleType: "linear"
          }
        },
        curve: "curveNatural",
        height: "400px"
      },

      chartID: "",
      counts: 1,
      listWidth: 0,
      listHeight: 0,
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
    this.$nextTick(function() {
      this.componentKey++;
    });
  },
  methods: {
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
    addGraph() {
      if (this.counts < 12) {
        this.counts++;
        this.$nextTick(function() {
          this.componentKey++;
        });
      }
    },
    deleteGraph() {
      if (this.counts > 0) {
        this.counts--;
      }
    }
  }
};
</script>
<style scope>
.list {
  position: absolute;
  top: 30px;
  bottom: 30px;
  left: 30px;
  right: 30px;
  box-shadow: 0 0 2px #aaa;
  background-color: white;
}
</style>
