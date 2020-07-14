export default {
  path: 'produceProcess',
  name: 'produceProcess',
  component: ()=> import('../../../views/page/application/Container.vue'),
  meta: {
    permission: 'produceProcess',
    localizationTitle: 'menu.produceProcess'
  },
  children: [
    {
      path: 'index',
      name: 'produceProcessIndex',
      meta: {
        permission: 'produceProcess',
        localizationTitle: 'menu.produceProcess'
      },
      component: ()=> import('../../../views/page/application/produceProcess/Index.vue')
    }
  ]
};
