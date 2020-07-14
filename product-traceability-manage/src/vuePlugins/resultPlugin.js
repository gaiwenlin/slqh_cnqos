export default {
  install: function (Vue, options) {
    // 3. 注入组件
    Vue.mixin({
      methods: {
        successResult (title, message) {
          this.$router.push({ name: 'result', params: { title, message, resultType: 'success' } });
        },
        errorResult (title, message) {
          this.$router.push({ name: 'result', params: { title, message, resultType: 'error' } });
        }
      }
    });
  }
};
