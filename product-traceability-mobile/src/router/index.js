import Vue from 'vue';
import VueRouter from 'vue-router';
import authorizationService from '../application/authorization';
import assist from '../utils/assist';
import routes from './routes/index';

Vue.use(VueRouter);

const routerConfig = {
  routes: routes
};

const router = new VueRouter(routerConfig);

const gotoAuthor = (to, from, next) => {
  if (to.path !== '/author') {
    localStorage.setItem('authorReturnUrl', to.fullPath);
  }
  else if (from) {
    localStorage.setItem('authorReturnUrl', from.fullPath);
  }
  next({ path: '/author' });
};

router.beforeEach((to, from, next) => {
  if (to.meta.authorize) {
    if (authorizationService.isAuthorized()) {
      // 判断当前路由地址是否为登录页面，则重定向到主页
      if (to.path === '/login' || to.path === '/author') {
        next({ path: '/' });
      }
      else {
        next();
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
  if (to.meta.title) {
    assist.setPageTitle(to.meta.title);
  }
  window.scrollTo(0, 0);
});
export default router;
