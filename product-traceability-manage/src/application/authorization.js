const authorization = {};

authorization.isAuthorized = () => {
  return !!localStorage.getItem('token');
};

authorization.getToken = () => {
  return localStorage.getItem('token');
};

authorization.setToken = (token, tokenExpireDate) => {
  localStorage.setItem('token', token);
};

authorization.clearToken = () => {
  localStorage.removeItem('token');
};

authorization.signIn = async (accessToken) => {
  authorization.setToken(accessToken);
};

authorization.logout = async () => {
  authorization.clearToken();
  const store = require('../store').default;
  await store.dispatch('tagsView/delAllViews');
  const router = require('../router').default;
  await router.push({ path: '/login' });
};
export default authorization;
