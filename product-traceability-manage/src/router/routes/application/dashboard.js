export default {
  path: 'dashboard',
  name: 'dashboard',
  component: ()=> import('../../../views/page/application/dashboard/Index.vue'),
  meta: {
    localizationTitle: 'menu.dashboard'
  }
};
