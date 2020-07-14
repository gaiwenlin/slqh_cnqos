export default {
  path: 'productCategory',
  name: 'productCategory',
  component: ()=> import('../../../views/page/application/Container.vue'),
  meta: {
    permission: 'productCategory',
    localizationTitle: 'menu.productCategory'
  },
  children: [
    {
      path: 'index',
      name: 'productCategoryIndex',
      meta: {
        permission: 'productCategory',
        localizationTitle: 'menu.productCategory'
      },
      component: ()=> import('../../../views/page/application/productCategory/Index.vue')
    }
  ]
};
