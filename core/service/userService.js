import Request from '../Request';
import { userApi } from '../api';

const getAll = async () => {
    const url = userApi;
       
    const req = new Request(url);
    
    return await req.send();
}

const getUserByResetToken = async (token) => {
    const url = `${userApi}/reset/${token}`;
        
    const req = new Request(url);
    
    return await req.send();
}

const toMember = async (accessToken, userId, body) => {
    const url = `${userApi}/member/${userId}`;
        
    const req = new Request(url, 'PATCH');
    req.setBody(body);
    req.setAuth(accessToken);
    
    return await req.send();
}

const updateUser = async (accessToken, dto) => {
    const url = `${userApi}`

    const req = new Request(url, 'PATCH');
    req.setBody(dto);
    req.setAuth(accessToken);

    return await req.send();
}

export default {
    getAll,
    getUserByResetToken,
    toMember,
    updateUser
}
