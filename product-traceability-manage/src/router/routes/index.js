import publicPages from './public';
import application from './application';
import Main from '../../views/page/Main';
import Layout from '../../views/page/application/layout/Index';

export const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/application/dashboard',
    component: Main,
    children: [
      application,
      {
        path: 'redirect',
        component: Layout,
        hidden: true,
        children: [
          {
            path: '/redirect/:path(.*)',
            component: () => import('@/views/page/redirect/Index')
          }
        ]
      },
    ]
  },
  ...publicPages,
];
