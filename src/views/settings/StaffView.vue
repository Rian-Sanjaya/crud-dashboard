<template>
  <div>
    <portal to="header-toolbar">
      <!-- <span class="header-download-csv">
        <a-icon type="download" style="margin-right: 8px" />
        Unduh CSV
      </span> -->
      <button class="header-button-add" @click="openForm">
        <a-icon type="plus" class="icon" />
        Tambah Staff
      </button>
    </portal>
    <dashboard-table
      searchPlaceholder="Cari Staff"
      :columnTable="columnsStaff"
      :dataTable="getStaffComputed"
      :pagination="pagination"
      :loadingTable="loading"
      :onSearchTable="onSearch"
      :perPageValue="perPageValue"
      @handleTableChange="handleTableChange"
      @showFilter="openFilterModal"
      @handlePerPageChange="handlePerPageChange"
    >
      <template slot="statusData" slot-scope="{ record }">
        <a-tag class="prx-ant-tag" :color="record | statusColor">
          {{ record }}
        </a-tag>
      </template>
      <template slot="actionDropdown" slot-scope="{ record }">
        <a-menu-item v-if="record.id !== getUserId">
          <a
            href="javascript:;"
            @click="handleUpdate(record.id, record.clientId)"
            >Ubah Data</a
          >
        </a-menu-item>
        <a-menu-item
          v-if="record.id !== getUserId && record.status === 'pending'"
        >
          <a href="javascript:;" @click="sendVerification(record)"
            >Verifikasi Email</a
          >
        </a-menu-item>
        <template v-if="record.id !== getUserId">
          <a-menu-divider />
          <a-menu-item>
            <a
              href="javascript:;"
              @click="handleDelete(record)"
              class="color-danger"
            >
              Hapus Staff
            </a>
          </a-menu-item>
        </template>
      </template>
    </dashboard-table>
    <staff-modal
      :modal-title="modalTitle"
      ref="form"
      @fetchData="fetchData"
      @filter="filterData"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import DashboardTable from '../../components/table/DashboardTable.vue';
import StaffModal from '../../components/staff/StaffModal.vue';

const columnsStaff = [
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
      columnsStaff,
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
    ...mapGetters('StaffStore', ['getStaffs', 'getTotalStaff']),
    ...mapGetters('UserStore', ['getUserId', 'getClientId']),
    getStaffComputed() {
      const staffData = this.getStaffs.map((staff, index) => {
        const tmp = staff;
        tmp.index =
          this.pagination.pageSize * (this.pagination.current - 1) + index + 1;
        tmp.roleText = tmp.role;
        if (tmp.status === 'active') tmp.statusText = 'Terverifikasi';
        else if (tmp.status === 'inactive')
          tmp.statusText = 'Tidak Terverifikasi';
        else tmp.statusText = 'Verifikasi Tertunda';
        return tmp;
      });
      return this.isFirst ? [] : staffData;
    }
  },
  components: {
    DashboardTable,
    StaffModal
  },
  filters: {
    statusColor(record) {
      let color = 'blue';
      if (record === 'Terverifikasi') color = 'green';
      else if (record === 'Tidak Terverifikasi') color = 'red';
      return color;
    }
  },
  methods: {
    ...mapActions('StaffStore', ['fetchAllStaffsWithParams', 'getUsersByRole']),
    onSearch(value) {
      this.search = value ? `&name_like=${value}` : '';
      this.pagination.page = 1;
      this.fetchData();
    },
    openForm() {
      this.modalTitle = 'Tambah Staff';
      this.$refs.form.showModal();
    },
    openFilterModal() {
      this.modalTitle = 'Filter';
      this.$refs.form.showFilter();
    },
    filterData(filter) {
      this.filter = filter;
      this.pagination.page = 1;
      this.fetchData();
    },
    handleUpdate(recordId, recordClientId) {
      this.modalTitle = 'Ubah Data';
      this.$refs.form.showModal(recordId, recordClientId);
    },
    sendVerification(record) {
      this.modalTitle = 'Verifikasi Email';
      this.$refs.form.showVerification(record);
    },
    handleDelete(record) {
      this.modalTitle = 'Hapus Staff';
      this.$refs.form.showDelete(record);
    },
    handlePerPageChange(value) {
      this.perPageValue = Number(value);
      const pager = { ...this.pagination };
      pager.perpage = Number(value);
      this.pagination = pager;
      if (pager.perpage > pager.total) {
        this.pagination.page = 1;
      }
      this.fetchData();
    },
    handleTableChange({ pagination, sorter }) {
      if (sorter.order) {
        if (sorter.columnKey === 'name') {
          this.sorter = `&_sort=name&_order=${
            sorter.order === 'ascend' ? 'asc' : 'desc'
          }`;
        } else if (sorter.columnKey === 'email') {
          this.sorter = `&_sort=email&_order=${
            sorter.order === 'ascend' ? 'asc' : 'desc'
          }`;
        } else {
          this.sorter = '';
        }
      } else {
        this.sorter = '';
      }
      const pager = { ...this.pagination };
      pager.page = pagination.current;
      pager.perpage = pagination.pageSize;
      this.pagination = pager;
      this.fetchData();
    },
    fetchData() {
      this.loading = true;
      const orderBy = this.sorter
        ? this.sorter
        : '&_sort=updatedAt&_order=desc';
      const payload = {
        page: this.pagination.page,
        limit: this.pagination.perpage,
        orderBy,
        role: '&role=staff',
        search: this.search
      };
      this.getUsersByRole(payload)
        .then(() => {
          const payload = {
            search: this.search
          };
          this.fetchAllStaffsWithParams(payload)
            .then(() => {
              this.loading = false;
              const tmpPagination = { ...this.pagination };
              tmpPagination.total = this.getTotalStaff;
              tmpPagination.pageSize = tmpPagination.perpage;
              tmpPagination.current = tmpPagination.page;
              this.pagination = tmpPagination;
              this.isFirst = false;
            })
            .catch((err) => {
              console.log('Error fetch total staff: ', err);
            });
        })
        .catch((err) => {
          console.log('Error fetch staff: ', err);
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

.prx-ant-tag {
  padding: 2px 16px;
  border-radius: 16px;
}
</style>
