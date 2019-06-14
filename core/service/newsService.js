import { newsApi } from '../api';
import Request from '../Request';
import axios from 'axios';

const fetchNews = async (id) => {
    const url = `${newsApi}/${id}`;
    
    const req = new Request(url);
    
    return await req.send();
}

const fetchNewsFeed = async (start = 0, count = 20) => {
    const url = newsApi;
    
    const req = new Request(url);

    req.setPaginator(start, count);
    
    return await req.send();
}

const postNews = async (accessToken, data) => {
    const url = newsApi;

    const req = new Request(url, 'POST');

    req.setAuth(accessToken);
    req.setBody(data);

    return await req.send();
}

const updateNews = async (accessToken, id, data) => {
    const url = `${newsApi}/${id}`;

    const req = new Request(url, 'PATCH');

    req.setAuth(accessToken);
    req.setBody(data);

    return await req.send();
}

const deleteNews = async (accessToken, id) => {
    const url = `${newsApi}/${id}`;

    const req = new Request(url, 'DELETE');

    req.setAuth(accessToken);

    return await req.send();
}

const uploadImage = async (formData) => {
    const url = `${newsApi}/upload`

    return await axios.post(url, formData);
}

export default {
    fetchNews,
    fetchNewsFeed,
    postNews,
    updateNews,
    deleteNews,
    uploadImage
}
