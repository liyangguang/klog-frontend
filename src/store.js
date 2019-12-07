import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload.user;
      if (payload.save) {
        Cookies.set('klog-user-pid', payload.user.pid, {expires: 30});
      }
    },
  },
});
