import AppService from '../AppService';
const service = new AppService('profile');
service.buildAction('uploadPortrait', 'post');
service.buildAction('changePassword', 'post');
service.buildAction('updateCurrentUserProfile', 'put');
service.buildAction('getPasswordComplexitySetting', 'get');
export default service;
