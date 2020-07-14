import AppService from '../AppService';
const service = new AppService('session');
service.buildAction('getCurrentLoginInformation', 'post');
export default service;
