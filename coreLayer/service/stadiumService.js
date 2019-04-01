import fetch from 'isomorphic-unfetch';
import { stadiumApi } from '../api/api';

const get = async () => {
    const url = stadiumApi;
    const res = await fetch(url);
    return await res.json();
}

export default {
    get,
}
