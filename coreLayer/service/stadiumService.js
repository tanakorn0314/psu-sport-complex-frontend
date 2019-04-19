import fetch from 'isomorphic-unfetch';
import { stadiumApi } from '../api/api';

const getAll = async () => {
    const url = `${stadiumApi}/all`;
    const res = await fetch(url);
    return await res.json();
}

const getById = async (id) => {
    const url = `${stadiumApi}/${id}`;
    const res = await fetch(url);
    return await res.json();
}

export default {
    getAll,
    getById
}
