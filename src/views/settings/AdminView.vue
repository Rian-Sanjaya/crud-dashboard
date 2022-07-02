<template>
  <div>
    <portal to="header-toolbar">
      <span class="header-download-csv">
        <a-icon type="download" style="margin-right: 8px" />
        Unduh CSV
      </span>
      <button class="header-button-add">
        <a-icon type="plus" class="icon" />
        Tambah Admin
      </button>
    </portal>
    <dashboard-table
      searchPlaceholder="Cari Admin"
      :columnTable="columnsAdmin"
      :dataTable="getAdminsComputed"
      :pagination="pagination"
      :loadingTable="loading"
      :onSearchTable="onSearch"
      @showFilter="openFilterModal"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import DashboardTable from '../../components/table/DashboardTable.vue';

const columnsAdmin = [
  {
    index: 0,
    title: 'No',
    dataIndex: 'index',
    key: 'index',
    width: 50
  },
  {
    index: 1,
    title: 'Nama',
    dataIndex: 'name',
    key: 'name',
    sorter: true
  },
  {
    index: 2,
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: true
  },
  {
    index: 3,
    title: 'Peran',
    dataIndex: 'roleText',
    key: 'role',
    sorter: false
  },
  {
    index: 4,
    title: 'Status',
    dataIndex: 'statusText',
    key: 'status',
    scopedSlots: { customRender: 'user_status' }
  },
  {
    index: 5,
    title: 'Aksi',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    width: 100,
    align: 'center'
  }
];

export default Vue.extend({
  data() {
    return {
      isFirst: true,
      columnsAdmin,
      loading: true,
      pagination: {
        page: 1,
        perpage: 10,
        current: 1,
        total: 0,
        pageSize: 0
      },
      search: '',
      filter: '',
      sorter: '',
      modalTitle: '',
      perPageValue: 10
    };
  },
  computed: {
    ...mapGetters('AdminStore', ['getAdmins']),
    getAdminsComputed() {
      const adminData = this.getAdmins.map((admin, index) => {
        const tmp = admin;
        tmp.index =
          this.pagination.pageSize * (this.pagination.current - 1) + index + 1;
        tmp.roleText = tmp.role;
        if (tmp.status === 'active') tmp.statusText = 'Terverifikasi';
        else if (tmp.status === 'inactive')
          tmp.statusText = 'Tidak Terverifikasi';
        else tmp.statusText = 'Verifikasi Tertunda';
        return tmp;
      });
      return this.isFirst ? [] : adminData;
    }
  },
  components: {
    DashboardTable
  },
  methods: {
    // ...mapActions('UserStore', ['getUserInfo']),
    ...mapActions('AdminStore', ['fetchAdmins']),
    onSearch(value) {
      this.search = value;
      this.pagination.page = 1;
      // this.fetchData();
    },
    openFilterModal() {
      this.modalTitle = 'Filter';
      // this.$refs.form.showFilter();
    },
    fetchData() {
      this.loading = true;
      const orderBy = this.sorter
        ? this.sorter
        : '&_sort=updatedAt&_order=desc';
      const payload = {
        page: this.pagination.page,
        limit: this.pagination.perPage,
        orderBy
      };
      this.fetchAdmins(payload)
        .then(() => {
          this.loading = false;
          const tmpPagination = { ...this.pagination };
          tmpPagination.total = this.getAdmins.length;
          tmpPagination.pageSize = tmpPagination.perpage;
          tmpPagination.current = tmpPagination.page;
          this.pagination = tmpPagination;
          console.log('admin pagination: ', this.pagination);
          this.isFirst = false;
        })
        .catch((err) => {
          console.log('Error fetch admin: ', err);
        });
    }
  },
  created() {
    this.$emit('setRightSidebarVisible', false);
  },
  mounted() {
    // this.getUserInfo();
    this.fetchData();
  }
});
</script>

<style lang="scss" scoped>
.header-download-csv {
  margin-right: 16px;
  font-size: 18px;
  font-weight: bold;
  color: #55b9e4;
  cursor: pointer;
}

.header-button-add {
  padding: 14px 24px;
  border-radius: 26px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background: #0146ab;
  outline: none;

  .icon {
    font-size: 16px;
  }

  &:focus {
    background: #1f64b8;
  }

  &:active {
    background: #0146ab;
  }
}

.prixa-ant-tag {
  padding: 2px 16px;
  border-radius: 16px;
}
</style>
