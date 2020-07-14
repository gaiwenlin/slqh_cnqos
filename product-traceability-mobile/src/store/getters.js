import assist from './../utils/assist';

const getters = {
  token: (state, getters) => {
    return state.session.tenant;
  },
  tenant: (state, getters) => {
    return state.session.tenant;
  },
  user: (state, getters) => {
    return state.session.user;
  },
  baseUrl (state, getters) {
    return assist.getInterfaceUrl();
  }
};
export default getters;
