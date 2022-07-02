import axios from 'axios';
import { USER_API } from './endpoints';

const getUsersAdmin = (payload) => {
  console.log(payload);
  return axios.get(USER_API.GET_ALL_ADMIN);
};

const getUserInfo = (id) => {
  return axios.get(USER_API.GET_BY_ID(id));
};

export { getUserInfo, getUsersAdmin };
