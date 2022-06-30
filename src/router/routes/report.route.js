export default [
  {
    path: '/transaction-history',
    name: 'TransactionHistory',
    meta: {
      breadcrumb: [
        { title: 'Beranda', url: '/' },
        { title: 'Laporan' },
        { title: 'Riwayat Transaksi', active: true }
      ],
      title: 'Riwayat Transaksi',
      requiresAuth: true
    }
    // component: () =>
    //   import(
    //     /* webpackChunkName: "TransactionHistory" */ '../../views/report/TransactionHistory.vue'
    //   )
  },
  {
    path: '/transaction-history/detail/:id',
    name: 'TransactionHistoryDetail',
    meta: {
      breadcrumb: [
        { title: 'Beranda', url: '/' },
        { title: 'Laporan' },
        { title: 'Riwayat Transaksi' },
        { title: 'Riwayat Transaksi Detail', active: true }
      ],
      title: 'Detail Transaksi',
      requiresAuth: true
    }
    // component: () =>
    //   import(
    //     /* webpackChunkName: "TransactionHistoryDetail" */ '../../views/report/transactionHistoryDetail.vue'
    //   )
  }
];
