import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import { userApi } from '../api/api';

const createUser = (user) => {
    const url = `${userApi}/signup`;
    return axios.post(url, user);
}

const get = () => {
    const url = userApi;
    return fetch(url);
}

const getUserByResetToken = async (token) => {
    const url = `${userApi}/reset/${token}`;
    return await fetch(url).then(response => response.json());
}

export default {
    createUser,
    get,
    getUserByResetToken
}
