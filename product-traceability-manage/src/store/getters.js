import assist from './../utils/assist';

const getters = {
  token (state, getters) {
    return state.authorization.token;
  },
  user (state, getters) {
    return state.session.user;
  },
  showUserName (state, getters) {
    let showUserName = '';
    if (state.session.tenant) {
      showUserName += state.session.tenant.name + '/';
    }
    if (state.session.user) {
      showUserName += state.session.user.userName;
    }
    return showUserName;
  },
  baseUrl (state, getters) {
    return assist.getInterfaceUrl();
  }
};
export default getters;
