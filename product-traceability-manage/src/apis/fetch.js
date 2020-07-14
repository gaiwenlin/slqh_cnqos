import axios from 'axios';
import assist from '../utils/assist';
import canknow from 'canknow-ui';
import authorization from '../application/authorization';

const ajax = axios.create({
  baseURL: assist.getInterfaceUrl(), // WebApi的前缀base_uri路径
  timeout: 60000 // 请求超时时间
});

ajax.defaults.withCredentials = false;

ajax.interceptors.request.use(config => {
  if (authorization.getToken()) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = `${authorization.getToken()}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

ajax.interceptors.response.use(
  response => {
    if (response.data.code === 0) {
      return Promise.resolve(response.data.data);
    }
    else {
      canknow.Message.error(response.data.msg);
      // return Promise.reject(response.data.msg);
    }
  },
  async error => {
    let message = error.message;
    if (error.response) {
      message = error.response.statusText;
      if (error.response.data?.data) {
        message = error.response.data?.data;
      }
      if (error.response.status === 401) {
        canknow.Message.error('无权限访问');
      }
    }
    canknow.Message.error(message);
    return Promise.reject(error);
  }
);
export default ajax;
