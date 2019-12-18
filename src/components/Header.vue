<template lang="pug">
header(:class="{'-scrolled': isScrolled}")
  router-link.logo(to="/") KLog
  nav
    template(v-if="$route.path !== '/signin'")
      ant-button(v-if="!isSignedin", type="primary", @click="navigateTo('signin')") 登录
      ant-button(v-else, @click="signout") 注销
    ant-button(v-if="isSignedin && $route.path === '/'", type="primary", @click="navigateTo('courses')") 课程管理入口
</template>

<script>
import {Button as AntButton} from 'ant-design-vue';

const SCROLL_THRESHOLD = 60;

export default {
  components: {AntButton},
  data(){
    return {
      isScrolled: false,
    };
  },
  computed: {
    isSignedin() {
      return !!this.$store.state.currentUser;
    },
  },
  created() {
    window.addEventListener('scroll', () => {
      this.isScrolled = window.scrollY > SCROLL_THRESHOLD;
    });
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    signout() {
      this.$store.commit('signout');
      this.navigateTo('/');
    },
  },
}
</script>

<style lang="postcss" scoped>
@import '../variables.css';

header {
  position: fixed;
  top: 0;left: 0;right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: var(--z-header);
  padding: 1em 2em;
  transition: all var(--transition-fast);

  &.-scrolled {
    background: #fff;
    box-shadow: 0 0 6px rgba(0,0,0,.5);
  }
}

.logo {
  font-size: 1.5em;
  font-weight: 600;
}

nav {
  display: flex;
  align-items: center;
}

button {
  margin-left: 1em;
}
</style>