<template>
  <div class="dashboard">
    <!-- <VisualPanel /> -->
    <iframe :src="'./visual-panel/index.html?token=' + token" frameborder="0"></iframe>
  </div>
</template>

<script>
import VisualPanel from './visual-panel.vue'
import authorization from '../../../../application/authorization';
export default {
  name: "Index",
  components: {
    VisualPanel
  },
  computed: {
    token() {
      return authorization.getToken()
    }
  }
};
</script>

<style lang="scss" scoped>
  iframe {
    width: 100%;
    height:calc(100vh - 130px);
  }
  .dashboard {
    margin-left: -15px;
    margin-right: -10px;
  }
</style>
