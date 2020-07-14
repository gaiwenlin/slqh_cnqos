import BlankLayout from '../../../views/page/BlankLayout';

export default {
  path: 'productBatch',
  name: 'productBatch',
  component: BlankLayout,
  children: [
    {
      path: 'index',
      meta: { share: true },
      name: 'productBatchIndex',
      component: () => import('../../../views/page/application/productBatch/Index')
    },
    {
      path: 'detail',
      meta: { share: true },
      name: 'productBatchDetail',
      component: () => import('../../../views/page/application/productBatch/Detail')
    }
  ]
};
