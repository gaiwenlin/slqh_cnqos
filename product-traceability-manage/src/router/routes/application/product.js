export default {
  path: 'product',
  name: 'product',
  component: ()=> import('../../../views/page/application/Container.vue'),
  meta: {
    permission: 'product',
    localizationTitle: 'menu.product'
  },
  children: [
    {
      path: 'index',
      name: 'productIndex',
      meta: {
        permission: 'product',
        localizationTitle: 'menu.product'
      },
      component: ()=> import('../../../views/page/application/product/Index.vue')
    }
  ]
};
