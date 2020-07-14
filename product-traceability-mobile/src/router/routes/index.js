import publicPage from './public';
import application from './application';

export default [
  ...publicPage,
  application,
  {
    path: '*',
    redirect: '/404'
  }
];
