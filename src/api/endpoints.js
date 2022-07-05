const BASE_URL = process.env.VUE_APP_API_BASE_URL;

export const USER_API = {
  GET_ALL: `${BASE_URL}/users`,
  GET_ALL_ADMIN: `${BASE_URL}/users?role=admin`,
  GET_ALL_ADMIN_WITH_PARAMS: (params) =>
    `${BASE_URL}/users?role=admin${params}`,
  GET_ALL_BY_ROLE: (page, limit, params) =>
    `${BASE_URL}/users?_page=${page}&_limit=${limit}${params}`,
  GET_BY_ID: (id) => `${BASE_URL}/users/${id}`,
  GET_BY_EMAIL: (email) => `${BASE_URL}/users?email=${email}`,
  CREATE_USER: `${BASE_URL}/users`,
  UPDATE_USER: (id) => `${BASE_URL}/users/${id}`,
  DELETE_USER: (id) => `${BASE_URL}/users/${id}`
};
