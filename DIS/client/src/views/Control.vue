<template>
  <div>
    <div class="title">제어</div>
    <b-card no-body>
      <b-tabs card>
        <b-tab
          v-for="(building, i) in buildings"
          :title="building.buildingName"
          v-bind:key="building.buildingName"
        >
          <div role="tablist">
            <b-card
              no-body
              class="mb-1"
              v-for="(deviceInfo, index) in building.deviceInfos"
              v-bind:key="deviceInfo.class"
            >
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-form inline>
                  <b-button
                    block
                    v-b-toggle="deviceInfo.class"
                    variant="info"
                    >{{ deviceInfo.class }}</b-button
                  >
                  <b-form-checkbox
                    name="check-button"
                    switch
                    v-model="deviceInfo.toggleAll"
                    @change="controlAll(i, index)"
                  >
                    전체 제어 :
                    <b v-if="deviceInfo.toggleAll == true">on</b>
                    <b v-else>off</b>
                  </b-form-checkbox>
                </b-form>
              </b-card-header>
              <b-collapse
                :id="deviceInfo.class"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body>
                  <b-card-text
                    v-for="device in building.deviceInfos[index].devices"
                    v-bind:key="device.name"
                  >
                    {{ device.name }}
                    <img :src="device.img" />
                    <b-form-checkbox
                      v-model="device.state"
                      name="check-button"
                      switch
                      @change="checkAll(i, index)"
                    >
                      <b v-if="device.state == true">on</b>
                      <b v-else>off</b>
                    </b-form-checkbox>
                  </b-card-text>
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
      buildings: [],
    };
  },

  created() {
    this.buildings = controlData.buildings;
  },

  mounted() {},

  methods: {
    controlAll(i, index) {
      let tempArr = this.buildings[i].deviceInfos[index];
      let toggle = tempArr.toggleAll;

      for (var n in tempArr.devices) {
        if (toggle == false) tempArr.devices[n].state = true;
        else tempArr.devices[n].state = false;
      }
    },

    checkAll(i, index) {
      let tempArr = this.buildings[i].deviceInfos[index];
      for (var n in tempArr.devices) {
        console.log(tempArr.devices[n].state);
        if (tempArr.devices[n].state == true) {
          tempArr.toggleAll = true;
          return;
        }
      }
      tempArr.toggleAll = false;
    },
  },
};
</script>

<style scoped>
.title {
  color: #6fcedc;
  font-size: 30px;
  font-weight: bold;
}
</style>
