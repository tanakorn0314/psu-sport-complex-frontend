import { newsApi } from '../api';
import Request from '../Request';
import axios from 'axios';

const fetchNews = async (start = 0, count = 20) => {
    const url = newsApi;
    
    const req = new Request(url);

    req.setPaginator(start, count);
    
    return await req.send();
}

const postNews = async (data) => {
    const url = newsApi;

    const req = new Request(url, 'POST');

    req.setBody(data);
    return await req.send();
}

const uploadImage = async (formData) => {
    const url = `${newsApi}/upload`

    return await axios.post(url, formData);
}

export default {
    fetchNews,
    postNews,
    uploadImage
}
