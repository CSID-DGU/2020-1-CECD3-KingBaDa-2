import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

Vue.config.productionTip = false
Vue.use(VueSidebarMenu)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
