<template>
  <PageFooter :about-us="aboutUs"
              :copy-right="copyRight"
              :version="$store.state.app.version"
              :copyRightLogo="copyRightLogo">
  </PageFooter>
</template>
<script>
  export default {
    name: 'ApplicationPageFooter',
    props: {
      aboutUs: {
          type: String,
          default: 'canknow'
      },
      copyRight: {
          type: String
      }
    },
    computed: {
      copyRightLogo () {
        return null;
      }
    },
    data () {
      return {
        hideBottomNavigation: false
      };
    },
    methods: {
      handleSelect (name) {
        this.$router.push({ name: name });
      }
    },
    mounted () {
    }
  };
</script>
<style lang="scss">
  @import "~canknow-ui/src/scss/variables";
  .page-footer-wrap{
    background: #fff;
    box-shadow: -2px -8px 41px -14px rgba(202, 210, 222, 0.61);
  }
</style>
