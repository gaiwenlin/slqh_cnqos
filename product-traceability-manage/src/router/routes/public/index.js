import account from './account';

export default [
  ...account,
  {
    path: '/404',
    name: '404',
    meta: { allowAnonymous: true, title: 'Page does not exist' },
    component: ()=> import('../../../views/page/public/ErrorPage')
  },
  {
    path: '/403',
    name: '403',
    meta: { allowAnonymous: true, title: 'You are not authorized' },
    component: ()=> import('../../../views/page/public/ErrorPage')
  },
  {
    path: '/500',
    name: '500',
    meta: { allowAnonymous: true, title: 'Server error' },
    component: ()=> import('../../../views/page/public/ErrorPage')
  },
  {
    path: '/result',
    name: 'result',
    meta: { allowAnonymous: true },
    component: ()=> import('../../../views/page/public/ResultPage')
  }
];
