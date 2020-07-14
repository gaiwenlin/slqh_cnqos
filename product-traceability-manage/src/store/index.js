import Vue from 'vue';
import Vuex from 'vuex';
import authorization from './modules/authorization';
import app from './modules/app';
import session from './modules/session';
import settings from './modules/settings';
import tagsView from './modules/tagsView';
import errorLog from './modules/errorLog';
import qiniu from './modules/qiniu';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  namespaced: true,
  getters,
  modules: {
    authorization,
    app,
    session,
    settings,
    tagsView,
    errorLog,
    qiniu
  },
  state: {
  },
  mutations: {

  }
});
export default store;
