import fetch from 'isomorphic-unfetch';
import { operationTimeApi } from '../api';

const getOperationTime = async () => {
    const url = operationTimeApi;
    return await fetch(url).then(response => response.json());
}

const setOperationTime = async (accessToken, operationTime) => {
    const url = operationTimeApi;
    const body = operationTime;
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + accessToken,
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    return await fetch(url, options).then(response => response.json());
}

const getBlackout = async () => {
    const url = `${operationTimeApi}/blackout`;
    return await fetch(url).then(response => response.json());
}

const createBlackout = async (accessToken, blackout) => {
    const url = `${operationTimeApi}/blackout`;
    const body = blackout;
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + accessToken,
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    return await fetch(url, options).then(response => response.json());
}

const deleteBlackout = async (accessToken, blackoutId) => {
    const url = `${operationTimeApi}/blackout/${blackoutId}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'bearer ' + accessToken,
        }
    }
    return await fetch(url, options).then(response => response.json());
}

export default {
    getOperationTime,
    setOperationTime,
    getBlackout,
    createBlackout,
    deleteBlackout
}
