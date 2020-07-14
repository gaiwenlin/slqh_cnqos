<template>
  <div class="result-page flex flex-vertical flex-center flex-middle">
    <div class="result-icon-box">
      <Icon class="result-icon" :class="iconClasses" :type="iconType"></Icon>
    </div>
    <h1 class="result-title">{{title}}</h1>
    <div class="result-message">
      {{message}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ResultPage',
    data () {
      return {
        title: 'result title',
        message: 'message',
        resultType: 'success'
      };
    },
    computed: {
      iconType () {
        return this.resultType === 'success' ? 'smile' : 'cry';
      },
      iconClasses () {
        return [this.resultType];
      }
    },
    mounted () {
      this.title = this.$route.params.title || this.title;
      this.message = this.$route.params.message || this.message;
      this.resultType = this.$route.params.resultType || this.resultType;
    }
  };
</script>
