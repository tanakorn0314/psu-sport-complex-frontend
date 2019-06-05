import Request from '../Request';
import { operationTimeApi } from '../api';

const getOperationTime = async () => {
    const url = operationTimeApi;
    
    const req = new Request(url);
    
    return await req.send();
}

const setOperationTime = async (accessToken, operationTime) => {
    const url = operationTimeApi;
    const body = operationTime;
    
    const req = new Request(url, 'POST');
    req.setBody(body);
    req.setAuth(accessToken);
    
    return await req.send();
}

const getBlackout = async () => {
    const url = `${operationTimeApi}/blackout`;
    
    const req = new Request(url);
    
    return await req.send();
}

const createBlackout = async (accessToken, blackout) => {
    const url = `${operationTimeApi}/blackout`;
    const body = blackout;
    
    const req = new Request(url, 'POST');
    req.setBody(body);
    req.setAuth(accessToken);
    
    return await req.send();
}

const deleteBlackout = async (accessToken, blackoutId) => {
    const url = `${operationTimeApi}/blackout/${blackoutId}`;

    const req = new Request(url, 'DELETE');
    req.setAuth(accessToken);
    
    return await req.send();
}

export default {
    getOperationTime,
    setOperationTime,
    getBlackout,
    createBlackout,
    deleteBlackout
}
