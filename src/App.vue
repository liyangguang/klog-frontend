<template lang="pug">
#app
  my-header
  router-view
</template>

<script>
import myHeader from './desktopComponents/Header.vue';

export default {
  components: {myHeader},
}
</script>

<style lang="postcss" scoped>
@import './variables.css';

#app {
  background: var(--background-gray);
  min-height: 100vh;
}
</style>
