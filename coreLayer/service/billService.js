import axios from 'axios';
import fetch from 'isomorphic-unfetch';
import { billApi } from '../api/api';

const getSlip = async (billId) => {
    const url = billApi;
    const result = await fetch(url);
    return await result.json();
}

const uploadSlip = async (accessToken, formData, billId) => {
    const url = `${billApi}/upload_slip/${billId}`;
    const config = {
        headers: {
            'Authorization': 'bearer ' + accessToken,
            
        }
    }
    const response = await axios.post(url, formData, config);
    return response;
}

const confirm = async (accessToken, billId, transactionInfo) => {
    const url = `${billApi}/confirm/${billId}`;
    const body = transactionInfo;
    const options = {
        method: 'PATCH',
        headers: {
            'Authorization': 'bearer ' + accessToken,
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    return await fetch(url, options).then(response => response.json());
}

const getMyBills = async (accessToken) => {
    const url = `${billApi}/my`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + accessToken,
        }
    }

    return await fetch(url, options).then(response => response.json());
}

export default {
    uploadSlip,
    getSlip,
    confirm,
    getMyBills
}
