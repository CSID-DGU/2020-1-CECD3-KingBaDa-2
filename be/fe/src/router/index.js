import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/id',
    name: 'loginedMain',
    component: () => import('../components/SideMenu.vue'),
    children:[
      {
        path: "main",
        name: "Main",
        component: () => import('../views/Main.vue')
      },
      {
        path: 'notice',
        name: 'Notice',
        component: () => import('../views/Notice.vue')
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue')
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
