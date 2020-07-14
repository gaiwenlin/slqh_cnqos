export default [
  {
    path: '/login',
    name: 'authorizeLogin',
    meta: { allowAnonymous: true, title: 'LogIn' },
    component: ()=> import('../../../views/page/public/authorize/Login')
  }
];
