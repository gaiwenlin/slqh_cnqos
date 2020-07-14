import applicationBase from './applicationBase/zh-CN';
import application from './application/zh-CN';
import system from './system/zh-CN';
import menu from './menu/zh-CN';
import permission from './permission/zh-CN';
import common from './common/zh-CN';

export default {
  app: {
    common,
    application: {
      ...application,
      ...applicationBase
    }
  },
  system,
  menu,
  permission
};
