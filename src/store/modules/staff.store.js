import {
  getUserStaffsWithParams,
  getUsersByRole,
  getUserById
} from '../../api/user';

const StaffStore = {
  namespaced: true,
  state: () => ({
    staffs: [],
    staff: {},
    totalStaff: 0
  }),
  getters: {
    getStaffs(state) {
      return state.staffs;
    },
    getStaff(state) {
      return state.staff;
    },
    getTotalStaff(state) {
      return state.totalStaff;
    }
  },
  actions: {
    async fetchAllStaffsWithParams({ commit }, payload) {
      const data = await getUserStaffsWithParams(payload);
      commit('SET_TOTAL_STAFF', data.data);
    },
    async getUsersByRole({ commit }, payload) {
      try {
        const data = await getUsersByRole(payload);
        commit('SET_STAFFS', data.data);
        return { status: true };
      } catch (err) {
        throw Error(err);
      }
    },
    async getStaffById({ commit }, id) {
      try {
        const data = await getUserById(id);
        commit('SET_STAFF', data.data);
        return { status: true };
      } catch (err) {
        throw Error(err);
      }
    }
  },
  mutations: {
    SET_STAFFS(state, data) {
      state.staffs = data;
    },
    SET_STAFF(state, data) {
      state.staff = data;
    },
    SET_TOTAL_STAFF(state, data) {
      state.totalStaff = data.length;
    }
  }
};

export default StaffStore;
