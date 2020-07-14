<template>
  <modular title="产品简介">
    <img slot="icon" src="../../../../assets/icons/section/chanpin-06.png">
    <div class="content-padding">
      <div class="product-description" v-if="model.product.description">{{model.product.description}}</div>
      <blank v-else>暂无数据</blank>
      <div class="product-video" v-if="model.product.video">
        <video controls :src="model.product.video|filePath"></video>
      </div>
    </div>
  </modular>
</template>

<script>
  export default {
    name: 'Description',
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
