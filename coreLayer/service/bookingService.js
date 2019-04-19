import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import { bookingApi } from '../api/api';

const getAll = async (accessToken) => {
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

const getByCourtId = async (courtId) => {
    const url = `${bookingApi}/court/${courtId}`;

    const response = await fetch(url);;
    return await response.json();
}

const getByStadiumId = async (stadiumId) => {
    const url = `${bookingApi}/stadium/${stadiumId}`;

    const response = await fetch(url);;
    return await response.json();
}

const book = async (accessToken, bookingInfo) => {
    const url = bookingApi;
    const body = {...bookingInfo};
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

const deleteBooking = async (accessToken, bookingId) => {
    const url = `${bookingApi}/id/${bookingId}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    }
    const response = await fetch(url, options);
    return await response.json();
}

const uploadSlip = async (accessToken, formData, bookingId) => {
    const url = `${bookingApi}/upload_slip/${bookingId}`;
    const config = {
        headers: {
            'Authorization': 'bearer ' + accessToken,
            'content-type': 'multipart/form-data'
        }
    }
    const response = await axios.post(url, formData, config);
    return response;
}

export default {
    get: getAll,
    getById,
    getByUserId,
    getByCourtId,
    getByStadiumId,
    book,
    uploadSlip,
    deleteBooking
}