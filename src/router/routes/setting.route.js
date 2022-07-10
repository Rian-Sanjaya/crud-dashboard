export default [
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      breadcrumbs: [
        { title: 'Beranda', url: '/' },
        { title: 'Pengaturan' },
        { title: 'Admin', active: true }
      ],
      title: 'Admin',
      requiredAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin" */ '../../views/settings/AdminView.vue'
      )
  },
  {
    path: '/staff',
    name: 'Staff',
    meta: {
      breadcrumb: [
        { title: 'Beranda', url: '/' },
        { title: 'Pengaturan' },
        { title: 'Staff', active: true }
      ],
      title: 'Staff',
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "staff" */ '../../views/settings/StaffView.vue'
      )
  },
  {
    path: '/product-list',
    name: 'ProductList',
    meta: {
      breadcrumb: [
        { title: 'Beranda', url: '/' },
        { title: 'Pengaturan' },
        { title: 'Daftar Produk', active: true }
      ],
      title: 'Daftar Produk',
      requiresAuth: true
    }
    // component: () =>
    //   import(
    //     /* webpackChunkName: "ProductList" */ '@/views/settings/Product.vue'
    //   )
  },
  {
    path: '/store-list',
    name: 'Store List',
    meta: {
      breadcrumb: [
        { title: 'Beranda', url: '/' },
        { title: 'Pengaturan' },
        { title: 'Daftar Cabang', active: true }
      ],
      title: 'Daftar Cabang',
      requiresAuth: true
    }
    // component: () =>
    //   import(
    //     /* webpackChunkName: "StoreList" */ '../../views/settings/Store.vue'
    //   )
  },
  {
    path: '/stock-product',
    name: 'Stock Product',
    meta: {
      breadcrumb: [
        { title: 'Beranda', url: '/' },
        { title: 'Pengaturan' },
        { title: 'Stok Produk', active: true }
      ],
      title: 'Stok Produk',
      requiresAuth: true
    }
    // component: () =>
    //   import(
    //     /* webpackChunkName: "StockProduct" */ '@/views/settings/StockProduct.vue'
    //   )
  },
  {
    path: '/stock-product/stock-update/:storeId/:variantId/:name',
    name: 'Update Stock',
    meta: {
      breadcrumb: [
        { title: 'Beranda', url: '/' },
        { title: 'Pengaturan' },
        { title: 'Perbarui Stok', active: true }
      ],
      title: 'Perbarui Stok',
      requiresAuth: true
    },
    // component: () =>
    //   import(
    //     /* webpackChunkName: "UpdateStock" */ '@/views/settings/StockUpdate.vue'
    //   ),
    props: true
  }
];
