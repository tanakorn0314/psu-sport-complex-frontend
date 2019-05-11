import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import { userApi } from '../api/api';

const createUser = (user) => {
    const url = `${userApi}/signup`;
    return axios.post(url, user);
}

const getAll = async () => {
    const url = userApi;
    return await fetch(url).then(response => response.json());
}

const getUserByResetToken = async (token) => {
    const url = `${userApi}/reset/${token}`;
    return await fetch(url).then(response => response.json());
}

const toMember = async (userId, data) => {
    const url = `${userApi}/member/${userId}`;
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    return await await fetch(url, options).then(response => response.json());
}

export default {
    createUser,
    getAll,
    getUserByResetToken,
    toMember
}
