import axios from 'axios';
import { USER_API } from './endpoints';

const getUserByEmail = (email) => axios.get(USER_API.GET_BY_EMAIL(email));

export { getUserByEmail };
