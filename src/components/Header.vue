<template lang="pug">
header
  router-link.logo(to="/") KLog
  nav
    ant-button(type="primary", ghost, @click="navigateTo('dashboard')") 教学管理入口
    
</template>

<script>
import AntButton from 'ant-design-vue/lib/button';

export default {
  components: {AntButton},
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