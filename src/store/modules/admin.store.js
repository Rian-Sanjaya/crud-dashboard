import {
  getUserAdminsWithParams,
  getUsersByRole,
  getUserById
} from '../../api/user';

const AdminStore = {
  namespaced: true,
  state: () => ({
    admins: [],
    admin: {},
    totalAdmins: 0
  }),
  getters: {
    getAdmins(state) {
      return state.admins;
    },
    getAdmin(state) {
      return state.admin;
    },
    getTotalAdmins(state) {
      return state.totalAdmins;
    }
  },
  actions: {
    async fetchAllAdminsWithParams({ commit }, payload) {
      const data = await getUserAdminsWithParams(payload);
      commit('SET_TOTAL_ADMIN', data.data);
    },
    async getUsersByRole({ commit }, payload) {
      try {
        const data = await getUsersByRole(payload);
        commit('SET_ADMINS', data.data);
        return { status: true };
      } catch (err) {
        throw Error(err);
      }
    },
    async getAdminById({ commit }, id) {
      try {
        const data = await getUserById(id);
        commit('SET_ADMIN', data.data);
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
    },
    SET_TOTAL_ADMIN(state, data) {
      state.totalAdmins = data.length;
    }
  }
};

export default AdminStore;
