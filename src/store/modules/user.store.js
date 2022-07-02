import { getUserInfo } from '../../api/user';

const UserStore = {
  namespaced: true,
  state: () => ({
    userId: '',
    clientId: '',
    userName: '',
    userRole: ''
  }),
  getters: {
    getUserId(state) {
      // return state.userId || JSON.parse(localStorage.getItem('userData')).id;
      return state.userId;
    },
    getClienId(state) {
      // return (
      //   state.clientId || JSON.parse(localStorage.getItem('userData')).clientId
      // );
      return state.clientId;
    },
    getUserName(state) {
      // return (
      //   state.userName || JSON.parse(localStorage.getItem('userData')).name
      // );
      return state.userName;
    },
    getUserRole(state) {
      // return (
      //   state.userRole || JSON.parse(localStorage.getItem('userData')).role
      // );
      return state.userRole;
    }
  },
  actions: {
    async getUserInfo({ commit }, id) {
      try {
        const data = await getUserInfo(id);
        commit('SET_USER_ID', data.data.id);
        commit('SET_CLIENT_ID', data.data.clientId);
        commit('SET_USER_NAME', data.data.name);
        commit('SET_USER_ROLE', data.data.role);
        localStorage.setItem('userData', JSON.stringify(data.data));
        if (data.status === 200) return { status: true };
        else return { status: false };
      } catch (err) {
        throw Error(err);
      }
    }
  },
  mutations: {
    SET_USER_ID(state, data) {
      state.userId = data;
    },
    SET_CLIENT_ID(state, data) {
      state.clientId = data;
    },
    SET_USER_NAME(state, data) {
      state.userName = data;
    },
    SET_USER_ROLE(state, data) {
      state.userRole = data;
    }
  }
};

export default UserStore;
