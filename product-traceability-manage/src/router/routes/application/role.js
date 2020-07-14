export default {
  path: 'role',
  name: 'role',
  meta: {
    permission: 'role',
    localizationTitle: 'menu.role'
  },
  component: ()=> import('../../../views/page/application/role/Index.vue')
};
