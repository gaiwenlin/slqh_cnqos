import * as accountApi from '../../apis/public/account';
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
  },
  actions: {
    async login ({ state, commit, rootState }, data) {
      return new Promise(async (resolve, reject) => {
        await accountApi.login(data).then((result) => {
          result.tokenExpireDate = data.rememberMe ? (new Date(new Date().getTime() + 1000 * result.expireInSeconds)) : undefined;
          resolve(result);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default authorizationStore;
