export default {
  path: 'growthProcess',
  name: 'growthProcess',
  component: ()=> import('../../../views/page/application/Container.vue'),
  meta: {
    permission: 'growthProcess',
    localizationTitle: 'menu.growthProcess'
  },
  children: [
    {
      path: 'index',
      name: 'growthProcessIndex',
      meta: {
        permission: 'growthProcess',
        localizationTitle: 'menu.growthProcess'
      },
      component: ()=> import('../../../views/page/application/growthProcess/Index.vue')
    }
  ]
};
