import axios from 'axios';
import { USER_API } from './endpoints';

const getUserInfo = (id) => {
  return axios.get(USER_API.GET_BY_ID(id));
};

export { getUserInfo };
