import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import { bookingApi } from '../api/api';

const get = async (accessToken) => {
    const url = bookingApi;
    const options = {
        headers: { 'Authorization': 'bearer ' + accessToken }
    }
    const response = await fetch(url, options);
    return await response.json();
}

const getById = async (accessToken, id) => {
    const url = `${bookingApi}/id/${id}`;
    const options = {
        headers: { 'Authorization': 'bearer ' + accessToken }
    }
    const response = await fetch(url, options);
    return await response.json();
}

const getByUserId = async (accessToken, userId) => {
    const url = `${bookingApi}/user/${userId}`;
    const options = {
        headers: {
            'Authorization': 'bearer ' + accessToken,
        }
    }
    const response = await fetch(url, options);;
    return await response.json();
}

const book = async (accessToken, title, description, userId, courtId, startDate, endDate) => {
    const url = bookingApi;
    const body = {
        title,
        description,
        userId,
        courtId,
        startDate,
        endDate
    }
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(url, options);
    return await response.json();
}

const uploadSlip = async (accessToken, formData) => {
    const url = `${bookingApi}/upload_slip/1`;
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    const response = await axios.post(url, formData, config);
    return response;
}

export default {
    get,
    getById,
    getByUserId,
    book,
    uploadSlip
}
