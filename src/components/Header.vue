<template lang="pug">
header(:class="{'-scrolled': isScrolled}")
  router-link.logo(to="/") KLog
  nav
    ant-button(type="primary", @click="navigateTo('dashboard')") 教学管理入口
    
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
  created() {
    window.addEventListener('scroll', () => {
      this.isScrolled = window.scrollY > SCROLL_THRESHOLD;
    });
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
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
</style>