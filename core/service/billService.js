import axios from 'axios';
import { billApi } from '../api';
import Request from '../Request';

const getSlip = async (billId) => {
    const url = billApi;
    const req = new Request(url);
    return await req.send();
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

    const req = new Request(url);
    req.setMethod('PATCH');
    req.setAuth(accessToken);
    req.setBody(transactionInfo);
    
    return await req.send();
}

const getMyBills = async (accessToken) => {
    const url = `${billApi}/my`;

    const req = new Request(url);
    req.setAuth(accessToken);

    return await req.send();
}

export default {
    uploadSlip,
    getSlip,
    confirm,
    getMyBills
}
