<template>
  <div class="page-wrap" :class="pageClasses" style="background:#ffffff;">
    <div class="page-header">
      <!-- <a class="logo" href="javascript:void(0);">
        <img src="./../../../assets/logo.png" alt="">
      </a> -->
      <label class="page-header-title">食礼秦淮</label>
    </div>
    <div class="page-content">
      <router-view></router-view>
    </div>
    <van-tabbar v-if="showBottomNavigation" class="page-bottom-navigation" v-model="bottomNavigationIndex" @change="handleTabChange">
      <van-tabbar-item :icon="bottomNavigation.icon" v-for="bottomNavigation in bottomNavigations" :key="bottomNavigation.path">
        {{$t(bottomNavigation.title)}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import appConfig from '../../../config/app';
  import bottomMenus from '../../../config/bottomMenus';

  export default {
    name: 'Main',
    data: () => {
      return {
        bottomNavigations: bottomMenus,
        bottomNavigationIndex: 0,
        transitionName: 'slide-left',
        style: ''
      };
    },
    watch: {
      '$route' (to, from) {
        this.style = to.meta.style || 'gray';
        let isBack = this.$router.isBack; //  监听路由变化时的状态为前进还是后退
        if (isBack) {
          this.transitionName = 'slide-right';
        }
        else {
          this.transitionName = 'slide-left';
        }
        this.$router.isBack = false;
        this.setMenu();
      }
    },
    computed: {
      pageClasses () {
        return {
          gray: this.style === 'gray'
        };
      },
      showBottomNavigation () {
        return this.bottomNavigations.find(bottomNavigation => bottomNavigation.path === this.$route.path);
      }
    },
    methods: {
      setMenu () {
        const activeNavItemIndex = this.bottomNavigations.findIndex((bottomNavigation) => {
          return this.$route.matched.find((matched) => {
            return matched.path === bottomNavigation.path;
          });
        });
        if (activeNavItemIndex > -1) {
          this.bottomNavigationIndex = activeNavItemIndex;
        }
        else {
          this.bottomNavigationIndex = null;
        }
      },
      handleTabChange (index) {
        this.$router.push(this.bottomNavigations[index].path);
      }
    },
    mounted () {
      this.style = this.$route.meta.style || 'gray';
      document.title = appConfig.name;
      this.setMenu();
    }
  };
</script>

<style lang="scss">
  @import "~canknow-ui-core/src/scss/index";
  .page-wrap {
    height: 100%;
    position: relative;
    overflow: auto;
  }

  .page-header {
    background: #ffffff;
    color: #333333;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $content-padding;
    text-align: center;
    position: fixed;
    width: 100%;
    z-index: 10;
    top: 0;
    .logo {
      display: block;
      img {
        height: $component-size;
        width: auto;
      }
    }
    .page-header-title {
      margin-left: $component-span;
      font-size: $font-size-large;
      font-family: PingFangSC-Regular;
      opacity: 0.9;
      user-select: none;
      letter-spacing: 1px;
      border-bottom: 2px solid #49A251;
    }
  }

  .page-content {
    padding-top: $component-size + $content-padding;
    padding-bottom: 65px;
  }

  .page-bottom-navigation {
    position: fixed;
  }
</style>
