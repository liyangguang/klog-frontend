import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/', component: Home},
  {path: '/dashboard', component: Dashboard},
  {path: '*', redirect: '/'},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
