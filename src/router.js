import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from './desktopComponents/Landing.vue'
import Dashboard from './desktopComponents/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/', component: Landing},
  {path: '/dashboard', component: Dashboard},
  {path: '*', redirect: '/'},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
