<template>
  <div id="app" class="mobile-app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  };
</script>

<style lang="scss">
  @import "~canknow-ui-core/src/scss/variables";
  html, body {
    width: 100%;
    height: 100%;
  }
  body {
    background-color: $app-background;
    margin: 0;
  }
  #app {
    height: 100%;
  }
</style>
