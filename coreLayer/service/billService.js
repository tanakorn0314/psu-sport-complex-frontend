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
            'content-type': 'multipart/form-data'
        }
    }

    console.log(formData);
    const response = await axios.post(url, formData, config);
    return response;
}

export default {
    uploadSlip,
    getSlip
}
