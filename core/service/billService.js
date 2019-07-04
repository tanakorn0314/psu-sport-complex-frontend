import axios from 'axios';
import { billApi } from '../api';
import Request from '../Request';

const getBills = async () => {
    const url = billApi;
    const req = new Request(url);
    return await req.send();
}

const confirm = async (accessToken, billId, data) => {
    const url = `${billApi}/confirm/${billId}`;

    const req = new Request(url, 'PATCH');

    req.setAuth(accessToken);
    req.setBody(data);

    return await req.send();
}

const getMyBills = async (accessToken) => {
    const url = `${billApi}/my`;

    const req = new Request(url);
    req.setAuth(accessToken);

    return await req.send();
}

export default {
    getBills,
    confirm,
    getMyBills
}
