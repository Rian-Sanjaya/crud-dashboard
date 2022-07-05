<template>
  <div>
    <a-modal
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      centered
      :width="400"
      :footer="null"
      :maskClosable="false"
      :closable="!isViewRolesInformation"
      :destroyOnClose="visibleContent !== 'Filter'"
      :style="{ borderRadius: '24px' }"
    >
      <template slot="title">
        <a-icon
          v-if="isViewRolesInformation"
          type="arrow-left"
          class="color-disabled"
          style="position: absolute; top: 24px; cursor: pointer"
          @click="viewRolesInformation"
        />
        <div>
          <span class="p-modal-header-title">{{
            isViewRolesInformation ? 'Informasi Peran' : modalTitle
          }}</span>
        </div>
      </template>
      <template v-if="visibleContent === 'Delete'">
        <delete-form
          :payload="{ id: record.id, clientId: record.clientId }"
          :name="record.name"
          label="Admin"
          :endPoint="deleteUser"
          @handleOk="handleOk"
          @handleCancel="handleCancel"
        />
      </template>
      <template v-else-if="visibleContent === ''">
        <div
          :style="isViewRolesInformation ? 'display: none;' : 'display: block;'"
        >
          <admin-form
            :id="recordId"
            :client-id="recordClientId"
            @view-roles-information="viewRolesInformation"
            @handleOk="handleOk"
            @handleCancel="handleCancel"
          />
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions } from 'vuex';
import AdminForm from './AdminForm.vue';
import DeleteForm from './../DeleteForm.vue';

export default Vue.extend({
  data() {
    return {
      visible: false,
      confirmLoading: false,
      isViewRolesInformation: false,
      record: {},
      recordId: '',
      recordClientId: '',
      visibleContent: ''
    };
  },
  props: {
    modalTitle: {
      type: String
    }
  },
  components: {
    AdminForm,
    DeleteForm
  },
  methods: {
    ...mapActions('UserStore', ['deleteUser']),
    showModal(id, clientId) {
      this.visible = true;
      this.visibleContent = '';
      this.recordId = '';
      this.recordClientId = '';
      if (id && clientId) {
        this.recordId = id;
        this.recordClientId = clientId;
      }
    },
    showFilter() {
      this.visible = true;
      this.visibleContent = 'Filter';
    },
    showVerification(data) {
      this.visible = true;
      this.visibleContent = 'Verification';
      this.record = data;
    },
    showDelete(data) {
      this.visible = true;
      this.visibleContent = 'Delete';
      this.record = data;
    },
    handleOk() {
      this.visible = false;
      this.$emit('fetchData');
    },
    handleCancel() {
      this.visible = false;
    },
    handleFilter(params) {
      this.visible = false;
      this.$emit('filter', params);
    },
    viewRolesInformation() {
      this.isViewRolesInformation = !this.isViewRolesInformation;
    }
  }
});
</script>
