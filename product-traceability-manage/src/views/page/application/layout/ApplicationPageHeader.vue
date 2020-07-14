<template>
  <PageHeader :pageLogo="pageLogo"
              theme="color"
              :show-title-block="false"
              :page-title="pageTitle"
              :activeMenuName="$store.state.app.activeMainMenuName"
              menuItemStyle="compact"
              menuTitleField="displayName">
    <div slot="left" class="flex-horizontal flex-middle">
      <hamburger :is-active="$store.state.app.sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <slot></slot>
    </div>
    <div class="page-header-right-wrap">
<!--      <div class="page-header-right-menu margin-right-1">-->
<!--        <tooltip :content="'system.globalSize.globalSize'|t" effect="dark" placement="bottom">-->
<!--          <size-select id="size-select" class="page-header-right-menu-item hover-effect" />-->
<!--        </tooltip>-->
<!--        <full-screen class="page-header-right-menu-item hover-effect"></full-screen>-->
<!--      </div>-->
      <dropdown v-if="$store.getters.user" class="user-block-dropdown margin-right-1">
        <div class="user-block" style="cursor: pointer">
          <div class="user-info">
            <h3>{{$store.getters.showUserName}}</h3>
            <h4>{{$store.getters.user.phoneNumber}}</h4>
          </div>
          <div class="user-avatar-wrap">
            <img class="user-avatar" :src="avatar"/>
          </div>
        </div>
        <dropdown-menu slot="dropdown">
          <DropdownMenuItem>
            <div @click="editEnterprise">
              {{$t('app.application.me.enterprise')}}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div @click="handleLogout">
              {{$t('app.common.action.logout')}}
            </div>
          </DropdownMenuItem>
        </dropdown-menu>
      </dropdown>
    </div>
  </PageHeader>
</template>

<script>
  import pageLogo from '../../../../assets/images/logo.png';
  import authorizationApi from '../../../../application/authorization';
  import Hamburger from './Hamburger';
  import defaultAvatar from './../../../../assets/images/avatar.png';

  export default {
    name: 'ApplicationPageHeader',
    components: {
      Hamburger
    },
    computed: {
      avatar () {
        return this.$store.getters.user.avatar||defaultAvatar;
      },
      pageLogo () {
        return pageLogo;
      },
      pageTitle () {
        return '';
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.commit('app/toggleSidebar');
      },
      editEnterprise () {
        this.$router.push({ path: '/application/me/enterprise' });
      },
      viewUserLoginAttempts () {
        this.$router.push({ path: '/profile/userLoginAttempt' });
      },
      viewProfile () {
        this.$router.push({ path: '/profile/index' });
      },
      changePassword () {
        this.$router.push({ path: '/profile/changePassword' });
      },
      async handleLogout () {
        this.$Loading.show();
        await authorizationApi.logout();
        this.$Loading.hide();
        await this.$router.push({ path: '/login' });
      }
    }
  };
</script>
