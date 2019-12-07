import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from './components/Landing.vue';
import Dashboard from './components/Dashboard.vue';
import Signin from './components/SignIn.vue';
import UploadDemo from './embededViews/UploadDemo.vue';
import {callApi} from './api.js';
import store from './store.js'
import Cookies from 'js-cookie';

Vue.use(VueRouter);


const routes = [
  // Note: `_api` is reserved for the node server, like `/_api/upload`
  {path: '/', component: Landing},
  {path: '/signin', component: Signin},
  {path: '/dashboard', component: Dashboard, beforeEnter: (_to, _from, next) => {
    const pid = Cookies.get('klog-user-pid') || (store.state.currentUser || {}).pid;
    if (!pid) {
      router.replace('signin');
      return;
    }

    callApi('config/teacher', {pid}).then((teacher) => {
      store.commit('setCurrentUser', {user: teacher[0]});
      next();
    });
  }},
  {path: '/_embed/upload', component: UploadDemo},
  {path: '*', redirect: '/'},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
