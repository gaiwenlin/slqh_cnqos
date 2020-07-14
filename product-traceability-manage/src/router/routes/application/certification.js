export default {
  path: 'certification',
  name: 'certification',
  component: ()=> import('../../../views/page/application/Container.vue'),
  meta: {
    permission: 'certification',
    localizationTitle: 'menu.certification'
  },
  children: [
    {
      path: 'index',
      name: 'certificationIndex',
      meta: {
        permission: 'certification',
        localizationTitle: 'menu.certification'
      },
      component: ()=> import('../../../views/page/application/certification/Index.vue')
    }
  ]
};
