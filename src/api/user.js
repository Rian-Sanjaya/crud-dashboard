import axios from 'axios';
import { USER_API } from './endpoints';

const getUserAdmins = () => {
  return axios.get(USER_API.GET_ALL_ADMIN);
};

const getUserAdminsWithParams = ({ search }) => {
  const params = `${search || ''}`;
  return axios.get(USER_API.GET_ALL_ADMIN_WITH_PARAMS(params));
};

const getUsersByRole = ({ page, limit, role, orderBy, search }) => {
  const params = `${role || ''}` + `${orderBy || ''}` + `${search || ''}`;
  return axios.get(USER_API.GET_ALL_BY_ROLE(page, limit, params));
};

const getUserById = (id) => {
  return axios.get(USER_API.GET_BY_ID(id));
};

const getUserInfo = (id) => {
  return axios.get(USER_API.GET_BY_ID(id));
};

const createUser = (payload) => {
  return axios.post(USER_API.CREATE_USER, payload, {
    headers: { 'Content-Type': 'application/json' }
  });
};

const updateUser = (payload) => {
  return axios.put(USER_API.UPDATE_USER(payload.id), payload.input, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

const deleteUser = (id) => {
  return axios.delete(USER_API.DELETE_USER(id));
};

export {
  getUserInfo,
  getUserAdmins,
  getUserAdminsWithParams,
  getUsersByRole,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
