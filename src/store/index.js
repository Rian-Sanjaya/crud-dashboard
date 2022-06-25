import Vue from 'vue';
import Vuex from 'vuex';
import FormStore from './modules/form.store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { FormStore }
});
