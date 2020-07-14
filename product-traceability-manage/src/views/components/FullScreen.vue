<template>
  <div>
    <icon class="full-screen-icon" :name="isFullscreen?'full-screen-on':'full-screen-off'" @click="click" />
  </div>
</template>

<script>
import screenfull from 'screenfull';

export default {
  name: 'FullScreen',
  data() {
    return {
      isFullscreen: false
    };
  },
  mounted() {
    this.initialize();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$Message.warning(this.$t('system.fullScreen.notSupport'));
        return false;
      }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    initialize() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change);
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change);
      }
    }
  }
};
</script>

<style scoped>
.full-screen-icon {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
}
</style>
