import AppService from '../AppService';
const service = new AppService('file');
service.buildAction('deleteFiles', 'delete');
export default service;
