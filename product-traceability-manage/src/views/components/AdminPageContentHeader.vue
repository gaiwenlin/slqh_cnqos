<template>
  <div class="admin-page-content-header">
    <div class="admin-page-content-title">
      <slot name="title"></slot>
    </div>
    <div class="admin-page-content-action-bar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AdminPageContentHeader'
  };
</script>
