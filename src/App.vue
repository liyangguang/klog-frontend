<template lang="pug">
#app
  my-header(v-if="!isEmbed")
  router-view
</template>

<script>
import myHeader from './components/Header.vue';

export default {
  components: {myHeader},
  data() {
    return {
      isEmbed: this.$route.path.includes('_embed'),
    };
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
