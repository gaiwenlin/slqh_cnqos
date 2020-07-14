import appConfig from '../config/app';
import store from '../store/index';

const assist = {};

assist.loadScript = function (url) {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  document.body.appendChild(script);
  return new Promise((resolve, reject) => {
    script.onload = function () {
      resolve(true);
    };
    script.onerror = function (e) {
      reject(e);
    };
  });
};

assist.extend = function (...args) {
  const length = args.length;
  let options;
  let name;
  let src;
  let srcType;
  let copy;
  let copyIsArray;
  let clone;
  let target = args[0] || {};
  let i = 1;
  let deep = false;
  if (typeof target === 'boolean') {
    deep = target;
    target = args[i] || {};
    i++;
  }
  if (typeof target !== 'object' && typeof target !== 'function') {
    target = {};
  }
  if (i === length) {
    target = this;
    i--;
  }
  for (; i < length; i++) {
    if ((options = args[i]) !== null) {
      for (name in options) {
        src = target[name];
        copy = options[name];
        if (target === copy) {
          continue;
        }
        srcType = Array.isArray(src) ? 'array' : typeof src;
        if (deep && copy && ((copyIsArray = Array.isArray(copy)) || typeof copy === 'object')) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && srcType === 'array' ? src : [];
          }
          else {
            clone = src && srcType === 'object' ? src : {};
          }
          target[name] = this.extend(deep, clone, copy);
        }
        else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
};

assist.getRootUrl = function () {
  return window.location.protocol + '//' + window.location.host;
};

assist.getFullUrlByRoute = function (route) {
  return window.location.protocol + '//' + window.location.host + window.location.pathname + '#' + route.fullPath;
};

assist.getInterfaceUrl = function () {
  return appConfig.baseUrl;
};

assist.getUrl = function (url, proxy) {
  let tempUrl = url;
  if (!tempUrl.includes('//')) {
    tempUrl = assist.getInterfaceUrl() + url;
  }
  if (proxy) {
    tempUrl = proxy + tempUrl;
  }
  return tempUrl;
};

assist.getImageUrl = function (url, proxy) {
  return assist.getUrl(url, proxy);
};

assist.getFullUrlByRoute = function (route) {
  return window.location.protocol + '//' + window.location.host + window.location.pathname + '#' + route.fullPath;
};

assist.getHashMenus = (menus, plainMenus) => {
  plainMenus = plainMenus || {};
  menus.forEach((menu) => {
    plainMenus[menu.name] = menu;
    if (menu.items) {
      assist.getHashMenus(menu.items, plainMenus);
    }
  });
  return plainMenus;
};

assist.getTreeFromPlain = (list, id = 'id', pid = 'pid', children = 'children', process = () => {}) => {
  const result = [];
  const hash = {};
  list.forEach((item) => {
    hash[item[id]] = item;
    process(item);
  });
  list.forEach((item) => {
    const parent = hash[item[pid]];
    if (parent) {
      !parent[children] && (parent[children] = []);
      parent[children].push(item);
    }
    else {
      result.push(item);
    }
  });
  return result;
};

assist.setPageTitle = function (title) {
  window.document.title = title || store.state.settings.title;
};

assist.isPc = function () {
  return !((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent));
};

assist.getRouterObjByName = function (routers, name) {
  if (!name || !routers || !routers.length) {
    return null;
  }
  let routerObj = null;
  for (let item of routers) {
    if (item.name === name) {
      return item;
    }
    routerObj = assist.getRouterObjByName(item.children, name);
    if (routerObj) {
      return routerObj;
    }
  }
  return null;
};

assist.handleTitle = function (vm, item) {
  if (!item) {
    return null;
  }
  else {
    return item.title;
  }
};

export default assist;
