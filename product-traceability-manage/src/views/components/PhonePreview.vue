<template>
  <div class="phone-preview">
    <div class="phone-head"></div>
    <div class="phone-body">
      <slot></slot>
    </div>
    <div class="phone-footer"></div>
  </div>
</template>

<script>
  export default {
    name: 'PhonePreview'
  };
</script>
<style lang="scss">
  @import "phone-preview";
</style>
