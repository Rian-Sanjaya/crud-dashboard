<template>
  <login-form />
</template>

<script>
import Vue from 'vue';
import LoginForm from '../../components/forms/LoginForm.vue';

export default Vue.extend({
  name: 'LoginView',
  data() {
    return {
      smallTittle: 'SELAMAT DATANG',
      title: 'Masukan informasi berikut untuk mengakses akun anda'
    };
  },
  components: {
    LoginForm
  }
});
</script>
