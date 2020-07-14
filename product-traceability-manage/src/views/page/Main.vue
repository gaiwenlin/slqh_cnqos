<template>
  <div v-if="loaded">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'Main',
    data () {
      return {
        loaded: false
      };
    },
    async created () {
      await this.$store.dispatch('session/getCurrentLoginInformation');
      this.loaded = true;
    }
  };
</script>
