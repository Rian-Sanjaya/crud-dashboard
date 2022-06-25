function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

const FormStore = {
  namespaced: true,
  state: () => ({
    hasErrors,
    form: null,
    loading: false,
    confirmDirty: false
  }),
  getters: {
    getForm(state) {
      return state.form;
    },
    getErrors(state) {
      return state.hasErrors;
    },
    getLoading(state) {
      return state.loading;
    },
    getConfirmDirty(state) {
      return state.confirmDirty;
    }
  },
  mutations: {
    VALIDATE_FIRST(state, data) {
      data.$nextTick(() => {
        state.form.validateFields();
      });
    },
    SET_FORM(state, data) {
      state.form = data;
    },
    SET_LOADING(state, data) {
      state.loading = data;
    },
    HANDLE_CONFIRM_BLUR(state, e) {
      const { value } = e.target;
      state.confirmDirty = state.confirmDirty || !!value;
    }
  }
};

export default FormStore;
