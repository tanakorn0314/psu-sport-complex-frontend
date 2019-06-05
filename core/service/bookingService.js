import axios from 'axios';
import { bookingApi } from '../api';
import Request from '../Request';

const getAll = async () => {
    const url = `${bookingApi}/all`;

    const req = new Request(url);
    
    return await req.send();
}

const getById = async (accessToken, id) => {
    const url = `${bookingApi}/id/${id}`;
    
    const req = new Request(url);
    req.setAuth(accessToken);
    
    return await req.send();
}

const getByUserId = async (accessToken, userId) => {
    const url = `${bookingApi}/user/${userId}`;

    const req = new Request(url);
    req.setAuth(accessToken);
    
    return await req.send();
}

const getByCourtId = async (courtId) => {
    const url = `${bookingApi}/court/${courtId}`;

    const req = new Request(url);
    
    return await req.send();
}

const getByStadiumId = async (stadiumId) => {
    const url = `${bookingApi}/stadium/${stadiumId}`;

    const req = new Request(url);
    
    return await req.send();
}

const book = async (accessToken, bookManyDTO) => {
    const url = bookingApi;
    const body = bookManyDTO;

    const req = new Request(url, 'POST');
    req.setBody(body);
    req.setAuth(accessToken);
    
    return await req.send();
}

const bookByAdmin = async (accessToken, bookByAdminDTO) => {
    const url = `${bookingApi}/admin`;
    const body = bookByAdminDTO;

    const req = new Request(url, 'POST');
    req.setBody(body);
    req.setAuth(accessToken);
    
    return await req.send();
}

const updateBooking = async (accessToken, bookingId, dto) => {
    const url = `${bookingApi}/${bookingId}`;
    const body = dto;

    const req = new Request(url, 'PATCH');
    req.setBody(body);
    req.setAuth(accessToken);
    
    return await req.send();
}

const deleteBooking = async (accessToken, bookingId) => {
    const url = `${bookingApi}/${bookingId}`;

    const req = new Request(url, 'DELETE');
    req.setAuth(accessToken);
    
    return await req.send();
}

const deleteByBillId = async (accessToken, billId) => {
    const url = `${bookingApi}/bill/${billId}`;
   
    const req = new Request(url, 'DELETE');
    req.setAuth(accessToken);
    
    return await req.send();
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