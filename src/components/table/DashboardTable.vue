<template>
  <div>
    <template v-if="!hideSearch">
      <a-input-search
        style="width: 20%; margin-right: 16px"
        size="large"
        class="search-table"
        :placeholder="searchPlaceholder"
        @search="onSearchTable"
        allow-clear
      />
    </template>
    <template v-if="!hideFilter">
      <a-button
        class="margin-smallR filter-table"
        icon="filter"
        size="large"
        @click="showFilter"
      >
        Filter
      </a-button>
    </template>
    <a-button
      v-if="showReportDownload"
      class="margin-smallR filter-table"
      icon="download"
      size="large"
      @click="zipReportDownload"
    >
      Unduh Bukti Transaksi
    </a-button>
    <slot name="tableFilter"></slot>
    <div class="margin-baseY p-table-container">
      <a-table
        :columns="columnTable"
        :data-source="dataTable"
        :scroll="{ x: 1000 }"
        :pagination="pagination"
        :loading="loadingTable"
        @change="handleTableChange"
        rowKey="id"
        :locale="locale"
      >
        <template slot="referenceCode" slot-scope="data, record">
          <slot name="referenceCode" :data="data" :record="record"></slot>
        </template>
      </a-table>
      <div class="" v-if="dataTable.length > 0">
        <span class="desc1">Tampilkan</span>
        <a-select :value="perPageValue" @change="handlePerPageChange">
          <a-select-option value="10">10</a-select-option>
          <a-select-option value="25">25</a-select-option>
          <a-select-option value="50">50</a-select-option>
          <a-select-option value="100">100</a-select-option>
        </a-select>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  data() {
    return {
      loading: true,
      locale: {
        emptyText: 'Tidak Ada Data'
      }
    };
  },
  props: [
    'searchPlaceholder',
    'columnTable',
    'dataTable',
    'pagination',
    'loadingTable',
    'onSearchTable',
    'hideSearch',
    'hideFilter',
    'hideDownload',
    'slotName',
    'perPageValue',
    'actionAllUser',
    'showReportDownload'
  ],
  computed: {
    ...mapGetters('UserStore', ['getUserId', 'getUserRole'])
  },
  methods: {
    showFilter() {
      this.$emit('showFilter');
    },
    zipReportDownload() {
      this.$emit('zipReportDownload');
    },
    handleTableChange(pagination, filters, sorter) {
      const sorterColumn = document.querySelectorAll(
        '.ant-table-column-sorter'
      );
      if (sorter.column) {
        sorterColumn.forEach((column, index) => {
          if (index === sorter.column.index)
            sorterColumn[sorter.column.index].getElementsByClassName.opacity =
              '1';
          else sorterColumn[index].style.opacity = null;
        });
      } else {
        sorterColumn.forEach((column, index) => {
          sorterColumn[index].style.opacity = null;
        });
      }
      this.$emit('handleTableChange', { pagination, filters, sorter });
    },
    handlePerPageChange(value) {
      this.$emit('handlePerPageChange', value);
    }
  }
});
</script>

<style lang="scss" scoped>
.filter-table {
  border-radius: 24px;
}

.p-pager-size {
  .desc1,
  .desc2 {
    font-size: 16px;
    color: #b2b3b5;
  }

  .desc1 {
    padding-right: 16px;
  }

  .desc2 {
    padding-left: 16px;
  }
}

.vertical-ellipsis-container {
  display: inline-block;
  transform: rotate(90deg);

  .vertical-ellipsis {
    width: 4px;
    height: 4px;
    background: #b2b3b5;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    display: inline-block;
    margin-right: 2px;
  }
}
</style>
