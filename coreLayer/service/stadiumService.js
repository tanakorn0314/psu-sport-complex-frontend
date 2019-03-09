import fetch from 'isomorphic-unfetch';
import { stadiumApi } from '../api/api';

const get = () => {
    const url = stadiumApi;
    return fetch(url);
}

export default {
    get,
}
