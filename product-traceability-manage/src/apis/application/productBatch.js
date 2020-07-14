import AppService from '../AppService';
const service = new AppService('productBatch');
service.buildAction('updatePrintNum', 'post');
export default service;
