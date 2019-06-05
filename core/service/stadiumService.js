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

export default {
    getAll,
    getById
}
