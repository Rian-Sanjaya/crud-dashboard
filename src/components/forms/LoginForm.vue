<template>
  <div class="login">Login Form</div>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';

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
  }
});
</script>
