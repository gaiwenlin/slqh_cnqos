import BlankLayout from '../../../views/page/BlankLayout';

export default {
  path: 'home',
  name: 'home',
  component: BlankLayout,
  children: [
    {
      path: 'index',
      meta: { style: 'light', share: true },
      name: 'homeIndex',
      component: () => import('../../../views/page/application/home/Index')
    }
  ]
};
