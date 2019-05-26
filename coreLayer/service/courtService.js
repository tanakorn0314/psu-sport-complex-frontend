import fetch from 'isomorphic-unfetch';
import { courtApi } from '../api';

const get = async () => {
    const url = courtApi;
    const result = await fetch(url);
    return await result.json();
}

export default {
    get,
}
