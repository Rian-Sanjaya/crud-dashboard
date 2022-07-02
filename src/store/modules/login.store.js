import { getUserByEmail } from '../../api/login';

const LoginStore = {
  namespaced: true,
  actions: {
    async login(_store, payload) {
      try {
        const email = payload.email;
        if (!email) return { status: false, message: 'Email not provided.' };
        const data = await getUserByEmail(email);
        if (data.data.length) {
          localStorage.setItem('accessToken', 'abc');
          return { status: true, data: data.data };
        } else {
          return { status: false, message: 'Data tidak ditemukan.' };
        }
      } catch (err) {
        throw Error(err);
      }
    }
  }
};

export default LoginStore;
