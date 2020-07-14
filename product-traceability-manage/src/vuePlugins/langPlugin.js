import canknow from 'canknow-ui';

export default {
  install: function (Vue, options) {
    Vue.mixin({
      filters: {
        t (name, ...args) {
          return canknow.t(name, ...args);
        }
      }
    });
  }
};
