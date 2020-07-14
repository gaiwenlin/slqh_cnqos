import authorization from '../../application/authorization';

const authorizationStore = {
  namespaced: true,
  state: {
    userId: null
  },
  getters: {
    token (state, getters) {
      return authorization.getToken();
    }
  },
  mutations: {
    setToken (state, token) {
      authorization.setToken(token);
    }
  }
};

export default authorizationStore;
