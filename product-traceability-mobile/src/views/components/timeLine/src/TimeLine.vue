<template>
  <div class="time-line">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: 'TimeLine'
    };
</script>

<style lang="scss">
  @import "~canknow-ui-core/src/scss/variables";
  .time-line {
    border-top: 1px solid $split-color;
    &-item {
      &:last-child {
        .time-line-item-tail {
          display: none;
        }
      }
    }
  }
</style>
