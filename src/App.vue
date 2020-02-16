<template lang="pug">
#app
  //- my-header(v-if="!isEmbed")
  router-view
</template>

<script>
import myHeader from './components/Header.vue';

export default {
  components: {myHeader},
  data() {
    return {
      isEmbed: this._checkEmbed(this.$route.path),
    };
  },
  watch: {
    $route(to) {
      this.isEmbed = this._checkEmbed(to.path);
    },
  },
  methods: {
    _checkEmbed(path) {
      return path.includes('_embed');
    },
  },
}
</script>

<style lang="postcss" scoped>
@import './variables.css';

#app {
  /* background: var(--background-gray); */
  min-height: 100vh;
}
</style>
