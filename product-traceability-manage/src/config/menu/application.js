export default [
  {
    name: 'traceability',
    icon: 'traceability',
    displayName: 'menu.traceability',
    permissions: ['productBatch'],
    items: [
      {
        name: 'productBatchIndex',
        path: '/application/productBatch/index',
        icon: 'setting',
        displayName: 'menu.productBatch',
        permissions: ['productBatch'],
      },
    ]
  },
  {
    name: 'baseData',
    icon: 'base-data',
    displayName: 'menu.baseData',
    permissions: ['productCategory', 'product', 'certification', 'growthProcess', 'produceProcess'],
    items: [
      {
        name: 'productCategoryIndex',
        path: '/application/productCategory/index',
        icon: 'setting',
        displayName: 'menu.productCategory',
        permissions: ['productCategory'],
      },
      {
        name: 'certificationIndex',
        path: '/application/certification/index',
        icon: 'setting',
        displayName: 'menu.certification',
        permissions: ['certification'],
      },
      {
        name: 'growthProcessIndex',
        path: '/application/growthProcess/index',
        icon: 'setting',
        displayName: 'menu.growthProcess',
        permissions: ['growthProcess'],
      },
      {
        name: 'produceProcessIndex',
        path: '/application/produceProcess/index',
        icon: 'setting',
        displayName: 'menu.produceProcess',
        permissions: ['produceProcess'],
      },
      {
        name: 'productIndex',
        path: '/application/product/index',
        icon: 'setting',
        displayName: 'menu.product',
        permissions: ['product'],
      }
    ]
  },
];
