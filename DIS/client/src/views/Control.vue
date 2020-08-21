<template>
  <div class="background">
    <b-card no-body>
      <b-tabs card>
        <b-tab v-for="building in buildings" :title="building.buildingName" v-bind:key="building">
          <div role="tablist">
            <b-card no-body class="mb-1" v-for="(deviceInfo,index) in building.deviceInfos" v-bind:key="deviceInfo">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="deviceInfo.class" variant="info">{{deviceInfo.class}}</b-button>
              </b-card-header>
              <b-collapse :id="deviceInfo.class" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-card-text v-for="device in building.deviceInfos[index].devices" v-bind:key="device">{{device}}</b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import controlData from "@/data/controlData.js";
//import axios from 'axios'

export default {
  name: "Control",
  data() {
    return {
      text: " test",
      buildings: []
    };
  },

  created(){
    this.buildings = controlData.buildings;
    console.log(this.buildings);
  },

  mounted(){
  },

  methods: {
  }
};
</script>

<style scoped>
.background{
  position: absolute;
  left: 150px;
  right: 20px;
}

</style>
