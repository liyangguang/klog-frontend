import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store.js'
import Cookies from 'js-cookie';
import {callApi} from './api.js';
import {COOKIE_KEY_NAME} from './store.js';

// pages
import Landing from './components/Landing.vue';
import Courses from './components/Courses.vue';
import Students from './components/Students.vue';
import Signin from './components/SignIn.vue';
import UploadDemo from './embededViews/UploadDemo.vue';
import EmbededCourses from './embededViews/Courses.vue';
import EmbededStudents from './embededViews/Students.vue';

Vue.use(VueRouter);

const routeGuard = async (to, _from, next) => {
  const pid = Cookies.get(COOKIE_KEY_NAME) || (store.state.currentUser || {}).pid;
  if (pid) {
    store.commit('setCurrentUser', {user: (await callApi('config/teacher', {pid}))[0]});
  }
  switch(to.path.split('/')[1]) {
    case '':
      next();
      break;
    case 'signin':
      pid ? router.replace('courses') : next();
      break;
    case 'courses':
    case 'students':
      pid ? next() : router.replace('signin');
      break;
    case '_embed':
      // Temporarily inject a user into the embed. We don't want user log in from embed page.
      // TODO(yangguang) remove this once the android connection is finished.
      const HARD_CODE_TEACHER_UID = '5df9855369c14386d2d42222';  // new-test
      store.commit('setCurrentUser', {user: (await callApi('config/teacher', {pid: HARD_CODE_TEACHER_UID}))[0]});
      next();
      break;
  }
};

const routes = [
  // Note: `_api` is reserved for the node server, like `/_api/upload`
  {path: '/', component: Landing, beforeEnter: routeGuard},
  {path: '/signin', component: Signin, beforeEnter: routeGuard},
  {path: '/courses', component: Courses, beforeEnter: routeGuard},
  {path: '/students/:coursePid', component: Students, beforeEnter: routeGuard},
  {path: '/_embed/courses', component: EmbededCourses, beforeEnter: routeGuard},
  {path: '/_embed/students/:coursePid', component: EmbededStudents, beforeEnter: routeGuard},
  {path: '/_embed/upload', component: UploadDemo},
  {path: '*', redirect: '/'},
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router;
