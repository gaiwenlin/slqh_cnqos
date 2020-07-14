import Main from '../../../views/page/application/Main';
import home from './home';
import productBatch from './productBatch';
import enterprise from './enterprise';

// 自定义动态路由
export default {
  path: '/',
  component: Main,
  name: 'index',
  children: [
    home,
    productBatch,
    enterprise
  ]
};
