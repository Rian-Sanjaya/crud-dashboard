import Vue from 'vue';
import Vuex from 'vuex';
import FormStore from './modules/form.store';
import LoginStore from './modules/login.store';
import UserStore from './modules/user.store';
import AdminStore from './modules/admin.store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { FormStore, LoginStore, UserStore, AdminStore }
});
