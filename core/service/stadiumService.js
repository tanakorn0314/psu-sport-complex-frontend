import Request from '../Request';
import { stadiumApi } from '../api';

const getAll = async () => {
    const url = `${stadiumApi}/all`;

    const req = new Request(url);
    
    return await req.send();
}

const getById = async (id) => {
    const url = `${stadiumApi}/${id}`;
       
    const req = new Request(url);
    
    return await req.send();
}

const createStadium = async (accessToken, dto) => {
    const url = `${stadiumApi}`;

    const req = new Request(url, 'POST');

    req.setBody(dto);
    req.setAuth(accessToken);
    
    return await req.send();
}

const updateStadium = async (accessToken, id, dto) => {
    const url = `${stadiumApi}/${id}`;

    const req = new Request(url, 'PATCH');

    req.setBody(dto);
    req.setAuth(accessToken);
    
    return await req.send();
}

const deleteStadium = async (accessToken, id) => {
    const url = `${stadiumApi}/${id}`;

    const req = new Request(url, 'DELETE');

    req.setAuth(accessToken);
    
    return await req.send();
}

export default {
    getAll,
    getById,
    createStadium,
    updateStadium,
    deleteStadium
}
