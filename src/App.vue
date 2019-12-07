<template lang="pug">
#app
  my-header(v-if="!isEmbed", :navs="navs")
  router-view
</template>

<script>
import myHeader from './components/Header.vue';

const DASHBOARD_NAV = [{path: 'dashboard', title: '教学管理入口'}];

export default {
  components: {myHeader},
  data() {
    return {
      isEmbed: this._checkEmbed(this.$route.path),
      navs: this._getNavs(this.$route.path),
    };
  },
  watch: {
    $route(to) {
      this.isEmbed = this._checkEmbed(to.path);
      this.navs = this._getNavs(to.path);
    },
  },
  methods: {
    _checkEmbed(path) {
      return path.includes('_embed');
    },
    _getNavs(path) {
      if (path === '/') {
        return DASHBOARD_NAV;
      } else {
        return [];
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
@import './variables.css';

#app {
  background: var(--background-gray);
  min-height: 100vh;
}
</style>
