import { authApi } from '../api/api';
import axios from 'axios';

const signIn = (username, password) => {
    return axios.post(authApi, {username, password});
}

export default {
    signIn
}