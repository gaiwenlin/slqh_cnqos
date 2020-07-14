import AppService from '../AppService';
const service = new AppService('enterprise');
service.buildAction('getAlls', 'post');
export default service;
