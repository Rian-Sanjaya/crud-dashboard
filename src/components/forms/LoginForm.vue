<template>
  <div class="login">
    <a-form
      layout="vertical"
      :form="form"
      :hideRequiredMark="true"
      @submit="handleSubmit"
    >
      <a-form-item
        label="Email"
        :validate-status="checkError('email') ? 'error' : ''"
        :help="checkError('email') || ''"
      >
        <a-input
          type="email"
          size="large"
          placeholder="nama@email.con"
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
      <a-form-item
        label="Password"
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
        />
      </a-form-item>
      <router-link to="/forgot-password" class="p-small-link color-secondary">
        Lupa password?
      </router-link>
      <a-form-item>
        <a-button
          block
          type="primary"
          size="large"
          shape="round"
          html-type="submit"
          class="margin-largeT login-button"
          :loading="loading"
          :disabled="hasErrors(form.getFieldsError())"
        >
          Masuk
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { message } from 'ant-design-vue';
import { passwordRegex } from '../../helpers/utils';

export default Vue.extend({
  name: 'LoginForm',
  data() {
    return {
      loginError: false,
      passwordRegex
    };
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
    ...mapActions('LoginStore', ['login']),
    ...mapActions('UserStore', ['getUserInfo']),
    checkError(field) {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched(field) && getFieldError(field);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        const userDataExternal = {
          email: values.email,
          password: values.password
        };
        if (!err) {
          this.setLoading(true);
          this.login(userDataExternal)
            .then((res) => {
              if (res.status) {
                this.getUserData(res.data[0].id);
              } else {
                message.info(res.message);
                this.setLoading(false);
              }
            })
            .catch(() => {
              this.setLoading(false);
              message.error('Login gagal.');
            });
        }
      });
    },
    getUserData(id) {
      this.getUserInfo(id)
        .then((res) => {
          this.setLoading(false);
          if (res.status) window.location = '/';
        })
        .catch(() => {
          message.error(
            'Ada kesalahan sistem, mohon ulangi beberapa saat lagi.'
          );
        });
    }
  },
  created() {
    this.setForm(this.$form.createForm(this, { name: 'Login_form' }));
  },
  mounted() {
    this.validateFirst(this);
  }
});
</script>

<style lang="scss" scoped>
.login-button {
  border-radius: 24px;
}

.radio-role.ant-radio-button-wrapper:not(:first-child)::before {
  width: 0;
  height: 0;
  background-color: transparent;
}

// .role-content {
//   padding: 15px 24px;
// }

// .radio-role-group.ant-radio-group-large
// .radio-role.ant-radio-button-wrapper > span.ant-radio-button {
//   padding: 15px 24px;
//   background: red;
// }

// label.radio-role.ant-radio-button-wrapper span.ant-radio-button {
//   padding: 15px 24px;
// }
</style>
