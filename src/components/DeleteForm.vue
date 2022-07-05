<template>
  <a-form
    :layout="formLayout"
    :form="form"
    @submit="handleSubmit"
    :hideRequiredMark="true"
  >
    <div class="margin-baseB" v-if="isSubmitError">
      <a-alert
        type="error"
        :message="`Gagal menghapus ${label.toLowerCase()}, mohon ulangi`"
        banner
      />
    </div>
    <div class="margin-baseB">
      <span>
        Masukkan password Anda untuk menghapus
        <strong>{{ name }}</strong>
        dari daftar {{ label }}:
      </span>
    </div>
    <a-form-item
      :validate-status="checkError('password') ? 'error' : ''"
      :help="checkError('password') || ''"
    >
      <a-input-password
        size="large"
        placeholder="Tulis password"
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: 'Data tidak valid',
                pattern: passwordRegex
              }
            ]
          }
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item>
      <div class="p-modal-button-container">
        <a-button class="p-modal-cancel" size="large" @click="handleCancel">
          Batal
        </a-button>
        <a-button
          type="danger"
          size="large"
          html-type="submit"
          :disabled="hasErrors(form.getFieldsError())"
          :loading="loading"
          class="p-modal-submit"
        >
          Hapus
        </a-button>
      </div>
    </a-form-item>
  </a-form>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import { message } from 'ant-design-vue';
import { passwordRegex } from '../helpers/utils';

export default Vue.extend({
  data() {
    return {
      formLayout: 'vertical',
      adminData: {},
      isSubmitError: false,
      passwordRegex
    };
  },
  props: {
    payload: {
      type: Object
    },
    label: {
      type: String
    },
    name: {
      type: String
    },
    endPoint: {
      type: Function
    }
  },
  computed: {
    ...mapGetters('FormStore', {
      hasErrors: 'getErrors',
      form: 'getForm',
      loading: 'getLoading'
    })
  },
  methods: {
    ...mapMutations('FormStore', {
      setForm: 'SET_FORM',
      validateFirst: 'VALIDATE_FIRST',
      setLoading: 'SET_LOADING'
    }),
    checkError(field) {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched(field) && getFieldError(field);
    },
    handleCancel() {
      this.$emit('handleCancel');
    },
    handleSubmit(e) {
      e.preventDefault();
      this.isSubmitError = false;
      this.form.validateFields((_err, values) => {
        this.setLoading(true);
        const payload = {
          ...this.payload,
          password: values.password
        };
        this.endPoint(payload.id)
          .then(() => {
            this.setLoading(false);
            message.success(`${this.label} ${this.name} berhasil dihapus`);
            this.$emit('handleOk');
          })
          .catch(() => {
            this.setLoading(false);
            this.isSubmitError = true;
          });
      });
    }
  },
  created() {
    this.setForm(this.$form.createForm(this, { name: 'delete_form' }));
  },
  mounted() {
    this.validateFirst(this);
  }
});
</script>
