import { getUsersAdmin } from '../../api/user';

const AdminStore = {
  namespaced: true,
  state: () => ({
    admins: [],
    admin: {}
  }),
  getters: {
    getAdmins(state) {
      return state.admins;
    },
    getAdmin(state) {
      return state.admin;
    }
  },
  actions: {
    async fetchAdmins({ commit }, payload) {
      try {
        const data = await getUsersAdmin(payload);
        commit('SET_ADMINS', data.data);
        return { status: true };
      } catch (err) {
        throw Error(err);
      }
    }
  },
  mutations: {
    SET_ADMINS(state, data) {
      state.admins = data;
    },
    SET_ADMIN(state, data) {
      state.admin = data;
    }
  }
};

export default AdminStore;
