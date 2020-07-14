import assist from '../../utils/assist';
import authorization from '../../application/authorization';
import axios from 'axios';
import { Toast } from 'vant';

export default class RequestFetcher {
  ajax;
  prefix;
  baseUrl;
  disableTransform;

  constructor (options = {}) {
    this.baseUrl = options.baseUrl || assist.getInterfaceUrl();
    this.prefix = options.prefix || '';
    this.disableTransform = options.disableTransform || false;
    this.initialize();
  }

  initialize () {
    this.ajax = axios.create({
      baseURL: this.baseUrl + this.prefix,
      timeout: 60000
    });
    this.ajax.defaults.withCredentials = false;

    this.ajax.interceptors.request.use(
      config => {
        const token = authorization.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    this.ajax.interceptors.response.use(
      response => {
        if (!this.disableTransform) {
          return response.data.data;
        }
        else {
          return response.data;
        }
      },
      error => {
        let message = error.response.data.msg;
        Toast.fail(message);
        return Promise.reject(error);
      }
    );
  }

  delete (url, config) {
    return this.ajax.delete(url, config);
  }

  get (url, config) {
    return this.ajax.get(url, config);
  }

  patch (url, data) {
    return this.ajax.patch(url, data);
  }

  post (url, data) {
    return this.ajax.post(url, data);
  }

  put (url, data) {
    return this.ajax.put(url, data);
  }
}
