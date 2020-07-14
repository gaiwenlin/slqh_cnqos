<template>
  <div class="page-sidebar radius" :class="{'has-logo':$store.state.settings.sidebarLogo}">
    <div class="page-sidebar-wrap">
      <sidebar-logo v-if="$store.state.settings.sidebarLogo" :collapse="isCollapse"></sidebar-logo>
      <i-menu ref="sideMenu"
              :collapse="isCollapse"
              :default-active="activeMenu"
              :unique-opened="true"
              @select="handleMenuChange"
              :accordion="true">
        <template v-for="item in menuList">
          <template v-if="showMenuItem(item)">
            <menu-item v-if="!item.items || !item.items.length" :key="item.name" :index="item.name">
              <icon :name="item.icon" class="menu-item-icon"></icon>
              <span class="menu-item-title" slot="title">{{item.displayName|t}}</span>
            </menu-item>
            <submenu v-if="item.items && item.items.length" :key="item.name" :index="item.name">
              <template slot="title">
                <icon :name="item.icon" class="menu-item-icon"></icon>
                <span class="menu-item-title">{{item.displayName|t}}</span>
              </template>
              <template v-for="child in item.items">
                <menu-item :index="child.name" v-if="showMenuItem(child)" :key="child.name">
                  <span class="menu-item-title">{{child.displayName|t}}</span>
                </menu-item>
              </template>
            </submenu>
          </template>
        </template>
      </i-menu>
    </div>
  </div>
</template>

<script>
  import variables from './../../../../styles/variables.scss';
  import SidebarLogo from './Logo';
  import { hasPermission } from '../../../../utils/permission';

  export default {
    name: 'PageSidebar',
    components: { SidebarLogo },
    props: {
      menuList: Array
    },
    data () {
      return {
        variables
      };
    },
    computed: {
      activeMenu () {
        const route = this.$route;
        const { meta, name } = route;
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return name;
      },
      isCollapse () {
        return !this.$store.state.app.sidebar.opened;
      }
    },
    methods: {
      showMenuItem (menuItem) {
        return hasPermission(menuItem.permissions);
      },
      getMenuItem (indexPath) {
        let menuItem = null;
        let menu = this.menuList;
        indexPath.forEach(index => {
          menuItem = menu.find(menu => menu.name === index);
          menu = menuItem.items;
        });
        return menuItem;
      },
      handleMenuChange (index, indexPath, item) {
        const menuItem = this.getMenuItem(indexPath);
        this.$router.push({ path: menuItem.path });
        this.$emit('change', index);
      },
      getMenus() {
        this.$store.dispatch('app/getMenus');
      }
    },
    created () {
      this.getMenus();
    }
  };
</script>
<style lang="scss">
  @import "page-sidebar";
</style>
