import axios from 'axios';
import assist from '../../utils/assist';
import authorization from '../../application/authorization';
import { Toast } from 'vant';

const ajax = axios.create({
  baseURL: assist.getInterfaceUrl(), // WebApi的前缀base_uri路径
  timeout: 60000 // 请求超时时间
});

ajax.defaults.withCredentials = false;

ajax.interceptors.request.use(config => {
  if (authorization.getToken()) {
    config.headers.Authorization = `Bearer ${authorization.getToken()}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

ajax.interceptors.response.use(
  response => {
    if (response.data.success) {
      return Promise.resolve(response.data.result);
    }
    else {
      Toast.error(response.data.error.message);
      return Promise.reject(response.data.error.message);
    }
  },
  error => {
    let message = error.message;
    if (error.response) {
      message = error.response.statusText;
      if (error.response.data && error.response.data.error) {
        message = error.response.data.error.details || error.response.data.error.message;
      }
      if (error.response.data.unAuthorizedRequest) {
        authorization.logout();
      }
    }
    Toast.error(message);
    return Promise.reject(error);
  }
);
ajax.postForm = (url, data) => {
  return ajax.post(url, data, {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  });
};
export default ajax;
