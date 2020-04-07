import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import Dashboard from '../views/Dashboard.vue'
import Pesaje from '../views/Pesaje.vue'
import PesajeExterno from '../views/PesajeExterno.vue'

import Producto from '../views/Producto.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      let currentUser =(window.localStorage.user);
      if(currentUser) {
        console.log("yeah");
        
        next();
      } else {
        next("/Login");
      }
    },
    children: [
      {
        path: "/Dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/Pesaje",
        name: "Pesaje",
        component: Pesaje,
      },
      {
        path: "/PesajeExterno",
        name: "PesajeExterno",
        component: PesajeExterno,
      },
      {
        path: "/Productos",
        name: "Producto",
        component: Producto,
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
