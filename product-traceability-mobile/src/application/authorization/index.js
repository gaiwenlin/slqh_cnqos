import cookie from 'js-cookie';
import appConfig from '../../config/app';

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

authorization.signIn = async (accessToken, tokenExpireDate) => {
  cookie.set(appConfig.authorization.encrptedAuthTokenName, accessToken, { expires: tokenExpireDate });
  authorization.setToken(accessToken, tokenExpireDate);
};

authorization.logout = async () => {
  authorization.clearToken();
  const router = require('../../router').default;
  router.push({ path: '/author' });
};

export default authorization;
