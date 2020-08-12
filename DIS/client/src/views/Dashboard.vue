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
        @resizestop="componentKey=!componentKey"
        v-bind:key="index"
      >
        <ccv-area-chart :data="graph_data" :options="graph_option"></ccv-area-chart>
      </VueDragResize>
    </div>
  </div>
</template>

<script>
import VueDragResize from "vue-drag-resize";
import graphSets from "@/data/graphTest.js";
import graphData from "@/data/graphData.js";

export default {
  components: {
    VueDragResize
  },

  data() {
    return {
      name: "Dashboard",
      graph_data: [],
      graph_option: "",
      chartID: "",
      listWidth: 0,
      listHeight: 0,
      graphs: [],
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
    this.graphs = graphSets.graphs;
    this.graph_data = graphData.data;
    this.graph_option = graphData.options;
    this.$nextTick(function() {
      this.componentKey++;
    });
  },

  methods: {
    resize(newRect, index) {
      this.graphs[index].width = newRect.width;
      this.graphs[index].height = newRect.height;
      this.graphs[index].top = newRect.top;
      this.graphs[index].left = newRect.left;
      this.graph_option.height = newRect.height;
    },
    addGraph() {
      this.graphs.push({
        width: 500,
        height: 400,
        top: Math.floor(Math.random() * 100) + 50,
        left: Math.floor(Math.random() * 100) + 30
      });
      this.index++;
      this.$nextTick(function() {
        this.componentKey++;
      });
    },
    deleteGraph() {
      console.log("delete");
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
