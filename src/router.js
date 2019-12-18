import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from './components/Landing.vue';
import Courses from './components/Courses.vue';
import Students from './components/Students.vue';
import Signin from './components/SignIn.vue';
import UploadDemo from './embededViews/UploadDemo.vue';
import store from './store.js'
import Cookies from 'js-cookie';
import {callApi} from './api.js';

Vue.use(VueRouter);

const routeGuard = async (_to, _from, next) => {
  const pid = Cookies.get('klog-user-pid') || (store.state.currentUser || {}).pid;
  if (!pid) {
    router.replace('signin');
    return;
  }
  store.commit('setCurrentUser', {user: (await callApi('config/teacher', {pid}))[0]});
  next();
};

const routes = [
  // Note: `_api` is reserved for the node server, like `/_api/upload`
  {path: '/', component: Landing},
  {path: '/signin', component: Signin},
  {path: '/courses', component: Courses, beforeEnter: routeGuard},
  {path: '/students/:coursePid', component: Students, beforeEnter: routeGuard},
  {path: '/_embed/upload', component: UploadDemo},
  {path: '*', redirect: '/'},
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router;
