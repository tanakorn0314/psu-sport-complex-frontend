import axios from 'axios';
import { bookingApi } from '../api/api';
import { STORAGE } from '../storage/local-storage';

const get = async () => {
    const config = {
        headers: {'Authorization': 'bearer ' + STORAGE.getAccessToken()}
    }
    return await axios.get(bookingApi, config);
}

const book = async (title, description, userId, courtId, startDate, endDate) => {
    const config = {
        headers: {'Authorization': 'bearer ' + STORAGE.getAccessToken()}
    }
    const body = {
        title,
        description,
        userId,
        courtId,
        startDate,
        endDate
    }
    console.log(body);
    const result = await axios.post(bookingApi, body, config);
    return result;
}

export default {
    get,
    book
}
