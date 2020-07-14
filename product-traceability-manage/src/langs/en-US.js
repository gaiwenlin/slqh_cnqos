import applicationBase from './applicationBase/en-US';
import application from './application/en-US';
import menu from './menu/en-US';
import common from './common/en-US';

export default {
  app: {
    common,
    ...application,
    ...applicationBase
  },
  menu
};
