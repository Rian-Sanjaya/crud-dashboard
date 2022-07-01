const BASE_URL = process.env.VUE_APP_API_BASE_URL;

export const USER_API = {
  GET_BY_ID: (id) => `${BASE_URL}/users/${id}`,
  GET_BY_EMAIL: (email) => `${BASE_URL}/users?email=${email}`
};