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
    path: '/AdminHome',
    name: 'AdminHome',
    component: () => import('../views/admin/AdminHome.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../components/test.vue')
  },
  {
    path: '/id',
    name: 'LoginedMain',
    component: () => import('../components/SideMenu.vue'),
    children:[
      {
        path: "Main",
        name: "Main",
        component: () => import('../views/Main.vue')
      },
      {
        path: 'Notice',
        name: 'Notice',
        component: () => import('../views/Notice.vue')
      },
      {
        path: 'Dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue')
      },
      {
        path: 'Control',
        name: 'Control',
        component: () => import('../views/Control.vue')
      },
      {
        path: 'Data',
        name: 'Data',
        component: () => import('../views/Data.vue')
      },
      {
        path: 'Setting',
        name: 'Setting',
        component: () => import('../views/Setting.vue')
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
