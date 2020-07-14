<template>
  <breadcrumb class="app-breadcrumb hidden-sm-and-down" separator="/">
    <transition-group name="breadcrumb">
      <breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </breadcrumb-item>
    </transition-group>
  </breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp';

export default {
  name: 'ApplicationBreadcrumb',
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return;
      }
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false);
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;
      const toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    }
  }
};
</script>

<style lang="scss">
  @import "./../../../../styles/variables";

  /* breadcrumb transition */
  .breadcrumb-enter-active,
  .breadcrumb-leave-active {
    transition: all $transition-time;
  }

  .breadcrumb-enter,
  .breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
  }

  .breadcrumb-move {
    transition: all $transition-time;
  }

  .breadcrumb-leave-active {
    position: absolute;
  }
</style>
