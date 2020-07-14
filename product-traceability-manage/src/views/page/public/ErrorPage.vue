<template>
  <div class="error-page">
    <div class="error-page-header">
      <img height="24" class="logo" src="../../../assets/images/title-logo.png" />
    </div>
    <div class="error-body">
      <label class="error-code">{{ code }}</label>
      <p>{{ title }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ErrorPage',
    data () {
      return {
        title: null,
        code: 404
      };
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        vm.code = to.name;
        vm.title = to.meta.title;
      });
    }
  };
</script>
