import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUserPid: Cookies.get('klog-user-pid'),
  },
  mutations: {
    setCurrentUserPid(state, payload) {
      state.currentUserPid = payload.pid;
      if (payload.save) {
        Cookies.set('klog-user-pid', payload.pid, {expires: 30});
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
