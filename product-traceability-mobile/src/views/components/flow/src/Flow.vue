<template>
  <div class="flow">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: 'Flow'
    };
</script>

<style lang="scss">
  @import "~canknow-ui-core/src/scss/variables";
  .flow {
    &-item {
      &:last-child {
        .flow-item-tail {
          display: none;
        }
      }
    }
  }
</style>
