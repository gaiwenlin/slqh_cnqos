import AppService from '../AppService';
const service = new AppService('authorization');
service.buildAction('login', 'post');
service.buildAction('logout', 'post');
service.buildAction('sendCapcha', 'post');
export default service;
