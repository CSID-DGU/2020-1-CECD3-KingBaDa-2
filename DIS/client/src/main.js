import "@babel/polyfill"
import "mutationobserver-shim"
import Vue from "vue"
import "./plugins/bootstrap-vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import VueSidebarMenu from "vue-sidebar-menu"
import "vue-sidebar-menu/dist/vue-sidebar-menu.css"
import "@carbon/charts/styles.css"
import chartsVue from "@carbon/charts-vue"
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(VueSidebarMenu)
Vue.use(chartsVue)
Vue.prototype.$EventBus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
