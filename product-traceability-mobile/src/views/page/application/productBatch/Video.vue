<template>
  <modular title="产品视频">
    <img slot="icon" src="../../../../assets/icons/section/chanpin-07.png">
    <div class="content-padding">
      <div class="product-video" v-if="model.product.video">
        <video controls :src="model.product.video|filePath"></video>
      </div>
    </div>
  </modular>
</template>

<script>
  export default {
    name: 'Video',
    props: {
      model: null
    }
  };
</script>

<style lang="scss">
  @import "~canknow-ui-core/src/scss/variables";
  .product-video {
    margin-top: $component-span;
    video {
      width: 100%;
    }
  }
</style>
