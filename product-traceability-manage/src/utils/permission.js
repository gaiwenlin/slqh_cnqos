import store from './../store';
import appConfig from '../config/app';

export function parsePermissionByPath(path) {
  return path.slice(1).split('/').join('.');
}

export function reParsePermissionByName(name) {
  return '/' + name.split('.').join('/');
}

export function hasPermission (permissionName) {
  if (!permissionName) {
    return true;
  }
  if (store.state.session.user.userName === appConfig.superAdmin) {
    return true;
  }
  if (!store.state.session.permission.allPermissions.length) {
    return true;
  }
  if (Array.isArray(permissionName)) {
    return permissionName.find(permissionName => store.state.session.permission.grantedPermissions.find(item => item === permissionName));
  }
  return store.state.session.permission.grantedPermissions.find(item => item === permissionName);
}

export function hasAllOfPermissions () {
  return areAllGranted.apply(this, arguments);
}

export function isAnyGranted () {
  if (!arguments || arguments.length <= 0) {
    return true;
  }

  for (let i = 0; i < arguments.length; i++) {
    if (hasPermission(arguments[i])) {
      return true;
    }
  }

  return false;
}

export function areAllGranted () {
  if (!arguments || arguments.length <= 0) {
    return true;
  }

  for (let i = 0; i < arguments.length; i++) {
    if (!hasPermission(arguments[i])) {
      return false;
    }
  }
  return true;
}
