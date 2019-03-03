import { authApi } from '../api/api';
import axios from 'axios';
import fetch from 'isomorphic-unfetch';

const signIn = (username, password) => {
    const url = `${authApi}/signin/`;
    return axios.post(url, {username, password});
}

const signup = (user) => {
    const url = `${authApi}/signup/`;
    return axios.post(url, user);
}

const signWithToken = async (accessToken) => {
    const url = `${authApi}/sign_token`;
    const headers = {
        'Content-Type': 'application/json',
    }
    const body = {
        accessToken
    }
    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    }
    const response = await fetch(url, options);
    return await response.json();
}

export default {
    signIn,
    signWithToken,
    signup
}