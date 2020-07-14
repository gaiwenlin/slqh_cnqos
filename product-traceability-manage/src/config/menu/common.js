export default [
  {
    name: 'system',
    icon: 'setting',
    displayName: 'menu.system',
    permissions: ['user', 'role', 'enterprise'],
    items: [
      {
        name: 'user',
        path: '/application/user',
        displayName: 'menu.user',
        permissions: ['user'],
      },
      {
        name: 'role',
        path: '/application/role',
        displayName: 'menu.role',
        permissions: ['role'],
      },
      {
        name: 'enterprise',
        path: '/application/enterprise',
        displayName: 'menu.enterprise',
        permissions: ['enterprise'],
      }
    ]
  }
];
