import assist from './../../utils/assist';
import Cookies from 'js-cookie';
import menu from '../../config/menu';

const app = {
  namespaced: true,
  state: {
    device: 'desktop',
    size: Cookies.get('size') || 'medium',
    isFullScreen: false,
    themeColor: '',
    menuList: [],
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    navShow: [],
    menus: [],
    activeMainMenuName: null,
  },
  getters: {
    hashMenus (state, getters) {
      const hashMenus = {};
      assist.getHashMenus(state.menus, hashMenus);
      return hashMenus;
    }
  },
  mutations: {
    toggleDevice: (state, device) => {
      state.device = device;
    },
    setSize: (state, size) => {
      state.size = size;
      Cookies.set('size', size);
    },
    initSignalR (state) {
      state.initSignalR = true;
    },
    setOnline (state) {
      state.onlineStatus = true;
    },
    setOffline (state) {
      state.onlineStatus = false;
    },
    toggleSidebar: state => {
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      }
      else {
        Cookies.set('sidebarStatus', 0);
      }
    },
    closeSidebar: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0);
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    setMenus (state, menus) {
      state.menus = menus;
    },
  },
  actions: {
    getMenus ({ state }) {
      state.menus = menu;
    }
  }
};

export default app;
