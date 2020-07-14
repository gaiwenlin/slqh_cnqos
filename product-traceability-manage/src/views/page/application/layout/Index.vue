<template>
  <div class="page admin-page" :class="classes" v-if="$store.state.session.user">
    <div v-if="$store.state.app.device==='mobile'&&$store.state.app.sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <page-sidebar :menuList="menus"></page-sidebar>
    <div class="page-body">
      <div class="fixed-header">
        <application-page-header>
          <application-breadcrumb></application-breadcrumb>
        </application-page-header>
        <tags-view v-if="$store.state.settings.tagsView" ></tags-view>
      </div>
      <div class="page-content-wrap" :class="{'no-sidebar': !$store.state.app.sidebar.opened, hasTagsView: $store.state.settings.tagsView}">
        <div class="page-content">
          <router-view class="child-view"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import appConfig from '../../../../config/app';
    import ApplicationPageHeader from './ApplicationPageHeader';
    import PageSidebar from './PageSidebar';
    import TagsView from './tagsView/Index';
    import ApplicationBreadcrumb from './ApplicationBreadcrumb';
    import ResizeHandler from './mixin/ResizeHandler';
    import authorization from '../../../../application/authorization';

    export default {
        name: 'ApplicationLayout',
        mixins: [ResizeHandler],
        components: {
            ApplicationBreadcrumb,
            ApplicationPageHeader,
            PageSidebar,
            TagsView,
        },
        data () {
            return {
                user: this.$store.state.session.user,
                appTitle: appConfig.name,
                transitionName: 'slide-left',
                loadingContent: false,
                showPageTab: appConfig.showPageTab
            };
        },
        watch: {
            '$store.state.session.user' (value) {
                this.user = value;
            },
            '$route' (to, from) {
                this.setRoute(to);
            }
        },
        computed: {
            classes () {
                return {
                    hideSidebar: !this.$store.state.app.sidebar.opened,
                    openSidebar: this.$store.state.app.sidebar.opened,
                    withoutAnimation: this.$store.state.app.sidebar.withoutAnimation,
                    mobile: this.$store.state.app.device === 'mobile'
                };
            },
            menus () {
                return this.$store.state.app.menus;
            }
        },
        methods: {
            handleClickOutside () {
                this.$store.commit('app/closeSidebar', { withoutAnimation: false });
            },
            setRoute (to) {
                this.style = to.meta.style || 'gray';
                let isBack = this.$router.isBack; //  监听路由变化时的状态为前进还是后退
                if (isBack) {
                    this.transitionName = 'slide-right';
                }
                else {
                    this.transitionName = 'slide-left';
                }
                this.$router.isBack = false;
            },
            setContentLoading (loading) {
                this.loadingContent = loading;
            },
            logout () {
                authorization.logout();
            }
        },
      created() {
          this.$store.dispatch('qiniu/getToken');
      }
    };
</script>

<style lang="scss">
  @import "index";
</style>
