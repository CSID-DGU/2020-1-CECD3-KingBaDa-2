<template>
  <div>
    <b-button @click="addGraph">add</b-button>
    <b-button class="deleteButton" v-bind:key="index" @click="deleteGraph()">delete</b-button>
    <b-dropdown class="mx-1" right text="menu">
      <b-dropdown-item @click="addGraph">Item 1</b-dropdown-item>
      <b-dropdown-item>Item 2</b-dropdown-item>
      <b-dropdown-item>Item 3</b-dropdown-item>
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
      <div v-if>

          <ccv-area-chart :data="graph_data_example" :options="graphs[index].option" v-bind:key="index"></ccv-area-chart>
        </div>
      </VueDragResize>
    </div>
  </div>
</template>

<script>
import VueDragResize from "vue-drag-resize";
import graphSettings from "@/data/graphSettings.js";
import graphData from "@/data/areaGraphData.js";

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
      graph_option_example: "", //그래프 설정 예시
      graph_data_example: [] //그래프 데이터 예시
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
    this.graph_data_example = graphData.data;
    this.graph_option_example = graphData.options;
  },

  methods: {
    resize(newRect, index) {
      this.graphs[index].width = newRect.width;
      this.graphs[index].height = newRect.height;
      this.graphs[index].top = newRect.top;
      this.graphs[index].left = newRect.left;
      this.graphs[index].option.height = newRect.height;
    },

    addGraph() {
      this.graphs.push({
        width: 500,
        height: 400,
        top: Math.floor(Math.random() * 100) + 50,
        left: Math.floor(Math.random() * 100) + 30,
        option: this.graph_option_example
      });
      this.graph_data.push({
        datum: this.graph_data_exmaple
      })
      this.index++;
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
