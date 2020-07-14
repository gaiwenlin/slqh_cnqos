import * as sessionApi from '../../apis/public/session';

const sessionStore = {
  namespaced: true,
  state: {
    user: null
  },
  actions: {
    getCurrentLoginInformation ({ state }) {
      return new Promise((resolve, reject) => {
        sessionApi.getCurrentLoginInformation().then((result) => {
          state.user = result.user;
          if (state.user) {
            localStorage.setItem('user', JSON.stringify(state.user));
          }
          resolve(result);
        }, (error) => {
          reject(error);
        });
      });
    }
  }
};
export default sessionStore;
