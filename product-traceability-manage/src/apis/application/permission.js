import AppService from '../AppService';
const service = new AppService('permission');
service.buildAction('getAllPermissions', 'get');
export default service;
