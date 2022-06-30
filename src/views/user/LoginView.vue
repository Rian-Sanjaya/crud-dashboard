<template>
  <left-content-page :smallTitle="smallTitle" :title="title">
    <login-form />
  </left-content-page>
</template>

<script>
import Vue from 'vue';
import LeftContentPage from '../../components/pages/LeftContentPage.vue';
import LoginForm from '../../components/forms/LoginForm.vue';

export default Vue.extend({
  name: 'LoginView',
  data() {
    return {
      smallTitle: 'SELAMAT DATANG!',
      title: 'Masukan informasi berikut untuk mengakses akun anda:'
    };
  },
  components: {
    LeftContentPage,
    LoginForm
  }
});
</script>
