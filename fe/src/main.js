<<<<<<< HEAD
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

=======
import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

Vue.config.productionTip = false;
Vue.use(VueSidebarMenu);
>>>>>>> fcb5096ed05e4655a1b2f5b6806042b05935ca4b
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
