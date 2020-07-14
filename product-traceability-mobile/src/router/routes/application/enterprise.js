import BlankLayout from '../../../views/page/BlankLayout';

export default {
  path: 'enterprise',
  name: 'enterprise',
  component: BlankLayout,
  children: [
    {
      path: 'index',
      meta: { share: true },
      name: 'enterpriseIndex',
      component: () => import('./../../../views/page/application/enterprise/Index')
    },
    {
      path: 'detail',
      meta: { share: true },
      name: 'enterpriseDetail',
      component: () => import('./../../../views/page/application/enterprise/Detail')
    }
  ]
};
