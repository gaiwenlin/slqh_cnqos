import fetch from './fetch';

export default class AppService {
  name;
  moduleName;

  constructor (name, moduleName = '') {
    this.name = name;
    this.moduleName = moduleName;
  }

  buildAction (action, method = 'post') {
    this[action] = async function (data) {
      switch (method) {
        case 'get':
        case 'head':
        case 'delete':
          return this.action(action, method, { params: data });
        case 'post':
        case 'put':
        case 'patch':
          return this.action(action, method, data);
      }
    };
  }

  action (action, method, data) {
    switch (method) {
      case 'get':
      case 'delete':
        return fetch[method](this.getAppServiceUrl(action), data);
      case 'post':
      case 'put':
        return fetch[method](this.getAppServiceUrl(action), data);
    }
  }

  get appServicePrefix () {
    return '/';
  }

  get appServiceBaseUrl () {
    if (this.name) {
      return this.appServicePrefix + this.name + '/';
    }
    else {
      return this.appServicePrefix;
    }
  }

  getAppServiceUrl (action) {
    return this.appServiceBaseUrl + action;
  }

  get(params) {
    return fetch.post(this.getAppServiceUrl('get'), params);
  }

  getAll(params) {
    return fetch.post(this.getAppServiceUrl('getAll'), params);
  }

  getAllByPage(params) {
    const data = Object.assign({}, params, {
      pageIndex: params.pageIndex + 1
    });
    return fetch.post(this.getAppServiceUrl('getAllByPage'), data);
  }

  create(data) {
    return fetch.post(this.getAppServiceUrl('create'), data);
  }

  update(data) {
    return fetch.post(this.getAppServiceUrl('update'), data);
  }

  delete(params) {
    return fetch.post(this.getAppServiceUrl('delete'), params);
  }

  setAsDefault(data) {
    return fetch.post(this.getAppServiceUrl('setAsDefault'), data);
  }

  install(data) {
    return fetch.post(this.getAppServiceUrl('install'), data);
  }
}
