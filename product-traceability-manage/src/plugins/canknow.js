import canknow from 'canknow-ui';
import Vue from 'vue';
import i18n from '../langs';
import assist from '../utils/assist';
import Cookies from 'js-cookie';

Vue.use(canknow, {
  i18n: (key, value) => i18n.t(key, value),
  config: {
    baseUrl: assist.getInterfaceUrl(),
    size: Cookies.get('size') || 'medium'
  },
});
