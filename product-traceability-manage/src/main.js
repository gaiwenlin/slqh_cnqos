import Vue from 'vue';
import i18n from './langs';
import store from './store/index';
import router from './router/index';
import directives from './directives';
import filters from './filters';
import components from './views/components';
import App from './views/App';
import './vuePlugins';
import './plugins';
import './utils/error-log';
import './registerServiceWorker';
import Print from 'vue-print-nb';

Vue.config.productionTip = false;
Vue.use(Print);

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Object.keys((components)).forEach(key => {
  Vue.component(key, components[key]);
});

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  data: {
    currentPageName: ''
  },
  components: { App },
  render: h => h(App)
});
