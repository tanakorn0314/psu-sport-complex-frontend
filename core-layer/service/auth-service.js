import { authApi } from '../api/api';
import axios from 'axios';

const signIn = (username, password) => {
    return axios.post(`${authApi}/signin/`, {username, password});
}

const signup = (user) => {
    return axios.post(`${authApi}/signup/`, user);
}

export default {
    signIn,
    signup
}