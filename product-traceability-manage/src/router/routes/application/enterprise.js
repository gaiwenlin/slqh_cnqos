export default {
  path: 'enterprise',
  name: 'enterprise',
  meta: {
    permission: 'enterprise',
    localizationTitle: 'menu.enterprise'
  },
  component: ()=> import('../../../views/page/application/enterprise/Index.vue')
};
