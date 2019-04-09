import { authApi } from '../api/api';
import fetch from 'isomorphic-unfetch';

const signIn = (username, password) => {
    const url = `${authApi}/signin/`;
    const headers = {
        'Content-Type': 'application/json',
    }
    const body = {
        username,
        password
    }
    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    }
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url, options).then(response => response.json());
            if (response.accessToken) {
                resolve(response);
            } else {
                reject(response);
            }
        } catch (error) {
            reject(error);
        }
    });
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
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url, options).then(response => response.json());
            if (response.accessToken) {
                resolve(response);
            } else {
                reject(response);
            }
        } catch (error) {
            reject(error);
        }
    });
}


const signup = (user) => {
    const url = `${authApi}/signup/`;
    const headers = {
        'Content-Type': 'application/json',
    }
    const body = user
    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    }
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url, options).then(response => response.json());
            if (!response.error) {
                resolve(response);
            } else {
                reject(response);
            }
        } catch (error) {
            reject(error);
        }
    });
}

export default {
    signIn,
    signWithToken,
    signup
}