import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';

Vue.use(Vuex);

const COOKIE_KEY_NAME = 'klog-user-pid';

export default new Vuex.Store({
  state: {
    currentUser: null,
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload.user;
      if (payload.save) {
        Cookies.set(COOKIE_KEY_NAME, payload.user.pid, {expires: 30});
      } else if (payload.save === false) {  // undefined => pass
        Cookies.remove(COOKIE_KEY_NAME);
      }
    },
  },
});
