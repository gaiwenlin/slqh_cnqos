export default {
  path: 'me',
  name: 'me',
  component: ()=> import('../../../views/page/application/Container.vue'),
  meta: {
    localizationTitle: 'menu.me.me'
  },
  children: [
    {
      path: 'enterprise',
      name: 'meEnterprise',
      meta: {
        localizationTitle: 'menu.me.enterprise'
      },
      component: ()=> import('../../../views/page/application/me/Enterprise.vue')
    }
  ]
};
