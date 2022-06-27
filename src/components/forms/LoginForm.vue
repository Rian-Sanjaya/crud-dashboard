<template>
  <div class="login">
    <a-form layout="vertical" :form="form" :hideRequiredMark="true">
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
    </a-form>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex';

export default Vue.extend({
  name: 'LoginForm',
  data() {
    return {
      loginError: false
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
    checkError(field) {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched(field) && getFieldError(field);
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
