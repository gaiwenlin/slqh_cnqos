import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import authorization from './modules/authorization';
import user from './modules/user';
import getters from './getters';
import session from './modules/session';

Vue.use(Vuex);

const store = new Vuex.Store({
  namespaced: true,
  getters,
  modules: {
    app,
    authorization,
    user,
    session
  }
});
export default store;
