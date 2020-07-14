<template>
  <div class="flow-item" >
    <div class="flow-item-tail"></div>
    <div class="flow-item-node"></div>
    <div class="flow-item-header">
      <div class="flow-item-title">{{title}}</div>
    </div>
    <div class="flow-item-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FlowItem',
    props: {
      title: null
    }
  };
</script>

<style lang="scss">
  @import "~canknow-ui-core/src/scss/variables";
  .flow-item {
    display: flex;
    padding: $content-padding;
    position: relative;
    &-tail {
      position: absolute;
      left: 100px;
      top: calc(#{$content-padding} + 4px);
      height: 100%;
      border-left: 2px solid #e4e7ed;
    }
    &-node {
      top: calc(#{$content-padding} + 4px);
      left: 101px;
      width: 14px;
      height: 14px;
      position: absolute;
      transform: translateX(-50%);
      background-color: #e4e7ed;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-header {
      width: 100px;
      .flow-item-title {
        font-size: $font-size-small;
        margin-bottom: $text-span;
      }
    }
    &-body {
      flex: 1;
      padding-left: $content-padding;
      img {
        width: 70%;
        border-radius: $block-border-radius;
      }
    }
  }
</style>
