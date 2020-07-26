import sessionApi from '../../apis/public/session';
import { parsePermissionByPath } from '../../utils/permission';
import { getTreeFromPlain } from 'canknow-ui-core/src/utils/assist';
import canknow from 'canknow-ui';

const session = {
  namespaced: true,
  state: {
    user: null,
    permission: {
      allPermissions: [],
      grantedPermissions: []
    },
  },
  getters: {
    permissionTree (state, getters, rootState) {
      const items = [];
      state.permission.allPermissions.forEach(permissionName => {
        const paths = permissionName.split('.');
        for(let i = 0; i < paths.length; i++) {
          const splitPermissionName = paths.slice(0, i + 1).join('.');
          let parentId = null;
          if (i > 0) {
            parentId = paths.slice(0, i).join('.');
          }
          let item = items.find(item => item.id === splitPermissionName);
          if (!item) {
            let displayName = splitPermissionName;
            if (i === 0) {
              displayName += '.' + displayName;
            }
            item = {
              id: splitPermissionName,
              parentId: parentId,
              name: canknow.t('permission.' + displayName)
            };
            items.push(item);
          }
        }
      });
      return getTreeFromPlain(items);
    },
    shownUserName (state, getters, rootState) {
      return state.user ? state.user.userName : 'Anonymous';
    }
  },
  mutations: {
    setPermission(state, permission) {
      state.permission = permission;
    }
  },
  actions: {
    getCurrentLoginInformation ({ state }) {
      return new Promise((resolve, reject) => {
        sessionApi.getCurrentLoginInformation().then((result) => {
          if(result){
            if(result.user){
              state.user = result.user;
            }
            if(result.allPermissions){
              state.permission.allPermissions = result.allPermissions.map(parsePermissionByPath);
            }
            if(result.permissions){
              const grantedPermissions = result.permissions.map(parsePermissionByPath);
              const grantedPermissionsHash = {};
              grantedPermissions.forEach(grantedPermission => {
                grantedPermissionsHash[grantedPermission] = grantedPermission;
              });
              grantedPermissions.forEach(grantedPermission => {
                const paths = grantedPermission.split('.');
                if (paths.length > 1) {
                  if (!grantedPermissionsHash[paths[0]]) {
                    grantedPermissionsHash[paths[0]] = paths[0];
                  }
                }
              });
              state.permission.grantedPermissions = Object.keys(grantedPermissionsHash);
            }
          }
          resolve(result);
        }, (error) => {
          reject(error);
        });
      });
    }
  }
};
export default session;
