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

Vue.config.productionTip = false
Vue.use(VueSidebarMenu)
Vue.use(chartsVue)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
