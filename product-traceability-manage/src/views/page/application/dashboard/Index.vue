<template>
  <div class="dashboard">
    <a class="btn" :href="'./visual-panel/index.html?fullscreen=1&token=' + token" target="_blank">开启全屏</a>
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
    position: relative;
    .btn {
      position: absolute;
      right: 10px;
      top: -25px;
      font-size: 14px;
      z-index: 100;
      color: #333;
      user-select: none;
      &:hover {
        cursor: pointer;
        color: #07c160;
      }
    }
  }
</style>
