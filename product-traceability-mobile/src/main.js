import Vue from 'vue';
import App from './views/App';
import i18n from './langs/index';
import './vuePlugins';
import store from './store';
import router from './router';
import directives from './directives';
import filters from './filters';
import components from './views/components';
import Vant, { ImagePreview,Lazyload } from 'vant';
import 'vant/lib/index.css';
import './styles/index.scss';

Vue.use(Vant);
Vue.use(ImagePreview);
Vue.use(Lazyload);

Vue.config.productionTip = false;

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Object.keys((components)).forEach(key => {
  Vue.use(components[key]);
});

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  render: h => h(App)
});
