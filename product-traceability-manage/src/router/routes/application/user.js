export default {
  path: 'user',
  name: 'user',
  component: ()=> import('../../../views/page/application/user/Index.vue'),
  meta: {
    permission: 'user',
    localizationTitle: 'menu.user'
  }
};
