<template>
  <a-spin :spinning="isLoading">
    <a-form
      :layout="formLayout"
      :form="form"
      @submit="handleSubmit"
      :hideRequiredMark="true"
    >
      <div class="margin-baseB" v-if="isSubmitError">
        <a-alert type="error" :message="submitErrorMessage" banner />
      </div>
      <a-form-item
        label="Nama"
        :validate-status="checkError('name') ? 'error' : ''"
        :help="checkError('name') || ''"
      >
        <a-input
          size="large"
          placeholder="Nama Lengkap"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: 'Data tidak valid' }] }
          ]"
        />
      </a-form-item>
      <a-form-item
        :validate-status="checkError('role') ? 'error' : ''"
        :help="checkError('role') || ''"
      >
        <template slot="label">
          <div>
            Peran
            <!-- <a-icon
              type='info-circle'
              theme='filled'
              class='color-primary margin-microL'
              style='cursor: pointer;'
              @click='viewRolesInformation'
            /> -->
          </div>
        </template>
        <a-select
          size="large"
          :disabled="true"
          show-search
          placeholder="Pilih Peran"
          option-filter-prop="children"
          style="width: 100%"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          v-decorator="['role', { rules: [{ required: true }] }]"
        >
          <a-select-option value="admin"> Admin </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="Email"
        :validate-status="checkError('email') ? 'error' : ''"
        :help="checkError('email') || ''"
      >
        <a-input
          size="large"
          placeholder="nama@mail.com"
          :disabled="this.id && this.clientId ? true : false"
          v-decorator="[
            'email',
            {
              rules: [
                {
                  required: true,
                  message: 'Data tidak valid',
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <!-- <a-form-item
        label="Perusahaan"
        :validate-status="checkError('company') ? 'error' : ''"
        :help="checkError('company') || ''"
        v-if="!clientIdUser"
      >
        <a-select
          size="large"
          show-search
          placeholder="Pilih Perusahaan"
          option-filter-prop="children"
          style="width: 100%"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          v-decorator="[
            'company',
            { rules: [{ required: clientIdUser ? false : true }] }
          ]"
          :loading="getCompanies.length < 1"
          :disabled="getCompanies.length < 1 || id !== ''"
        >
          <a-select-option
            v-for="company in getCompanies"
            :value="company.id"
            :key="company.id"
          >
            {{ company.client_name }}
          </a-select-option>
        </a-select>
      </a-form-item> -->
      <a-form-item>
        <div class="p-modal-button-container">
          <a-button class="p-modal-cancel" size="large" @click="handleCancel">
            Batal
          </a-button>
          <a-button
            type="primary"
            size="large"
            html-type="submit"
            :disabled="hasErrors(form.getFieldsError())"
            :loading="loading"
            class="p-modal-submit"
          >
            {{ this.id && this.clientId ? 'Ubah' : 'Tambah' }}
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </a-spin>
</template>

<script>
import Vue from 'vue';
// import { mapMutations, mapGetters, mapActions } from 'vuex';
import { mapMutations, mapGetters, mapActions } from 'vuex';
import { message } from 'ant-design-vue';

export default Vue.extend({
  data() {
    return {
      formLayout: 'vertical',
      clientIdUser: '',
      userStatus: '',
      isLoading: false,
      isSubmitError: false,
      submitErrorMessage: 'Gagal menambah admin, mohon ulangi'
    };
  },
  props: {
    id: {
      type: String
    },
    clientId: {
      type: String
    }
  },
  computed: {
    ...mapGetters('FormStore', {
      hasErrors: 'getErrors',
      form: 'getForm',
      loading: 'getLoading'
    }),
    ...mapGetters('AdminStore', ['getAdmin'])
  },
  methods: {
    ...mapMutations('FormStore', {
      setForm: 'SET_FORM',
      validateFirst: 'VALIDATE_FIRST',
      setLoading: 'SET_LOADING'
    }),
    ...mapActions('UserStore', ['createUser', 'updateUser']),
    ...mapActions('AdminStore', ['getAdminById']),
    checkError(field) {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched(field) && getFieldError(field);
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    // viewRolesInformation() {
    //   this.$emit('view-roles-information');
    // },
    setRoleIndoName(role) {
      if (role === 'admin') return 'Admin';
      return '';
    },
    handleBlur() {
      console.log('blur');
    },
    handleFocus() {
      console.log('focus');
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleCancel() {
      this.$emit('handleCancel');
    },
    handleSubmit(e) {
      e.preventDefault();
      this.isSubmitError = false;
      this.form.validateFields((err, values) => {
        this.setLoading(true);
        if (this.id && this.clientId) {
          const userData = {
            id: this.id,
            input: {
              email: values.email,
              name: values.name,
              role: values.role,
              status: this.userStatus,
              clientId: this.clientIdUser
            }
          };
          this.updateUser(userData)
            .then(() => {
              this.setLoading(false);
              message.success(`Data ${values.email} telah diperbarui`);
              this.$emit('handleOk');
            })
            .catch(() => {
              this.setLoading(false);
              this.submitErrorMessage = 'Gagal mengubah data, mohon ulangi';
              this.isSubmitError = true;
            });
        } else {
          const userData = {
            email: values.email,
            name: values.name,
            role: values.role,
            clientId: this.clientIdUser,
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          // console.log('userData: ', userData);
          this.createUser(userData)
            .then(() => {
              this.setLoading(false);
              message.success(
                `${
                  values.email
                } telah ditambahkan sebagai ${this.setRoleIndoName(
                  String(values.roles)
                )} di Prixa Farmasi`
              );
              this.$emit('handleOk');
            })
            .catch(() => {
              this.setLoading(false);
              this.isSubmitError = true;
            });
        }
      });
    }
  },
  created() {
    const userData = JSON.parse(String(localStorage.getItem('userData')));
    const clientId = userData.clientId ? userData.clientId : '';
    if (clientId) this.clientIdUser = clientId;
    // else this.fetch({ limit: 100, offset: 0 });
    this.setForm(this.$form.createForm(this, { name: 'admin_form' }));
  },
  mounted() {
    this.form.setFieldsValue({
      role: 'admin'
    });

    if (this.id && this.clientId) {
      this.isLoading = true;
      const data = {
        id: this.id
      };
      this.getAdminById(data.id).then(() => {
        this.form.setFieldsValue({
          name: this.getAdmin.name,
          email: this.getAdmin.email
        });
        this.userStatus = this.getAdmin.status;
        this.isLoading = false;
      });
    }
    this.validateFirst(this);
  }
});
</script>
