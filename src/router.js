import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from './components/Landing.vue'
import Dashboard from './components/Dashboard.vue'
import UploadDemo from './embededViews/UploadDemo.vue'

Vue.use(VueRouter)

const routes = [
  // Note: '_api' is reserved for the node server.
  {path: '/', component: Landing},
  {path: '/dashboard', component: Dashboard},
  {path: '/_embed/upload', component: UploadDemo},
  {path: '*', redirect: '/'},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
