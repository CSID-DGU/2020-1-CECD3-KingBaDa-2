<template>
  <div class="background">
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Tab 1" active>
          <div role="tablist">
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-1 variant="info">Accordion 1</b-button>
              </b-card-header>
              <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-card-text>{{ text }}</b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-2 variant="info">Accordion 2</b-button>
              </b-card-header>
              <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-card-text>{{ text }}</b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-3 variant="info">Accordion 3</b-button>
              </b-card-header>
              <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-card-text>{{deviceInfo[0].device[3]}}</b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>

            <b-card no-body class="mb-1" v-for="device in deviceInfo" v-bind:key = "device">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-3 variant="info">{{device.class}}</b-button>
              </b-card-header>
              <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-card-text>{{deviceInfo[0].device[3]}}</b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>

          </div>
        </b-tab>
        <b-tab title="Tab 2">
          <b-card-text>Tab contents 2</b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>

export default {
  name: "Control",
  data() {
    return {
      text: " test",
      deviceInfo: [
        {
          class: "5103",
          device: [
            {name: "온도1", state: false},
            {name: "온도2", state: true},
            {name: "온도3", state: false},
            {name: "온도4", state: true}
          ]
        },
        {
          class: "5104",
          device: [
            {name: "온도1", state: false},
            {name: "온도2", state: true},
            {name: "온도3", state: false},
            {name: "온도4", state: true}
          ]
        }
      ]
    };
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
