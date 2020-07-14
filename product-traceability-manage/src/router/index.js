import Vue from 'vue';
import VueRouter from 'vue-router';
import canknow from 'canknow-ui';
import { routes } from './routes';
import authorization from '../application/authorization';
import assist from './../utils/assist';
import { hasPermission } from '../utils/permission';
import store from './../store';

Vue.use(VueRouter);

const routerConfig = {
  routes
};

VueRouter.prototype.goBack = function () {
  this.isBack = true;
  window.history.go(-1);
};

const router = new VueRouter(routerConfig);

const gotoAuthor = (to, from, next) => {
  localStorage.setItem('authorReturnUrl', to.fullPath);
  next({ path: '/login' });
};

router.beforeEach(async (to, from, next) => {
  canknow.LoadingBar.start();
  assist.setPageTitle(to.meta.title);

  if (!to.meta.allowAnonymous) {
    if (authorization.isAuthorized()) {
      if (!store.state.session.user) {
        await store.dispatch('session/getCurrentLoginInformation');
        if (!store.state.session.user) {
          gotoAuthor(to, from, next);
        }
      }
      const isPermissionAllowed = to.meta.permission ? hasPermission(to.meta.permission) : true;
      if (isPermissionAllowed) {
        if (to.path === '/login') {
          next({ path: '/' });
        }
        else {
          next();
        }
      }
      else {
        canknow.Message.error('无权限访问');
        next({ path: '/application/dashboard' });
      }
    }
    else {
      gotoAuthor(to, from, next);
    }
  }
  else {
    next();
  }
});

// 路由跳转后操作（结束进度条特效）
router.afterEach((to, from, next) => {
  canknow.LoadingBar.finish();
  window.scrollTo(0, 0);
});
export default router;
