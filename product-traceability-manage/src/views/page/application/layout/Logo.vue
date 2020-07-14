<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebar-logo-fade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
  import * as settings from './../../../../settings';
  import logo from '../../../../assets/images/logo.png';

  export default {
    name: 'SidebarLogo',
    props: {
      collapse: {
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
        title: settings.title,
        logo
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "./../../../../styles/variables";

  .sidebar-logo-fade-enter-active {
    transition: opacity 1.5s;
  }

  .sidebar-logo-fade-enter,
  .sidebar-logo-fade-leave-to {
    opacity: 0;
  }

  .sidebar-logo-container {
    position: relative;
    width: 100%;
    height: $page-header-height;
    line-height: $page-header-height;
    background: $sidebar-logo-bg;
    overflow: hidden;

    .sidebar-logo-link {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 $content-padding;

      .sidebar-logo {
        width: $component-size;
        height: $component-size;
        vertical-align: middle;
      }

      .sidebar-title {
        flex: 1;
        margin-left: $component-span;
        color: #ffffff;
        font-size: $font-size-larger;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        font-weight: 600;
        line-height: $page-header-height;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        vertical-align: middle;
      }
    }

    &.collapse {
      .sidebar-logo {
        margin-right: 0;
      }
    }
  }
</style>
