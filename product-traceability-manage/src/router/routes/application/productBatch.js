export default {
  path: 'productBatch',
  name: 'productBatch',
  component: ()=> import('../../../views/page/application/Container.vue'),
  meta: {
    permission: 'productBatch',
    localizationTitle: 'menu.productBatch'
  },
  children: [
    {
      path: 'index',
      name: 'productBatchIndex',
      meta: {
        permission: 'productBatch',
        localizationTitle: 'menu.productBatch'
      },
      component: ()=> import('../../../views/page/application/productBatch/Index.vue')
    }
  ]
};
