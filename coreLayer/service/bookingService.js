import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import { bookingApi } from '../api';

const getAll = async () => {
    const url = `${bookingApi}/all`;
    return await fetch(url).then((response) => response.json());
}

const getById = async (accessToken, id) => {
    const url = `${bookingApi}/id/${id}`;
    const options = {
        headers: { 'Authorization': 'bearer ' + accessToken }
    }
    return await fetch(url, options).then((response) => response.json());
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

const book = async (accessToken, bookManyDTO) => {
    const url = bookingApi;
    const body = bookManyDTO;
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    return await fetch(url, options).then((response) => response.json());
}

const bookByAdmin = async (accessToken, bookByAdminDTO) => {
    const url = `${bookingApi}/admin`;
    const body = bookByAdminDTO;
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    return await fetch(url, options).then((response) => response.json());
}

const updateBooking = async (accessToken, bookingId, dto) => {
    const url = `${bookingApi}/${bookingId}`;
    const body = dto;
    const options = {
        method: 'PATCH',
        headers: {
            'Authorization': 'bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    return await fetch(url, options).then((response) => response.json());
}

const deleteBooking = async (accessToken, bookingId) => {
    const url = `${bookingApi}/${bookingId}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    }
    return await fetch(url, options).then((response) => response.json());
}

const deleteByBillId = async (accessToken, billId) => {
    const url = `${bookingApi}/bill/${billId}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    }
    return await fetch(url, options).then((response) => response.json());
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
    getAll,
    getById,
    getByUserId,
    getByCourtId,
    getByStadiumId,
    book,
    bookByAdmin,
    updateBooking,
    uploadSlip,
    deleteBooking,
    deleteByBillId
}