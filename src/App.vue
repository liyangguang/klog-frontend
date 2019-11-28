<template lang="pug">
#app
  my-header
  router-view
</template>

<script>
import myHeader from './components/Header.vue';

export default {
  components: {myHeader},
}
</script>

<style scoped>
#app {
  background: #EAF2F7;  
}
</style>
