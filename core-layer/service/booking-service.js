import axios from 'axios';
import { bookingApi } from '../api/api';

const get = async () => {
    return await axios.get(bookingApi);
}

const book = async (court, startTime, finishTime) => {
    const body = {
        userId: 1,
        courtId: 1,
        startTime,
        finishTime
    }
    return await axios.post(bookingApi, body);
}

export default {
    get,
    book
}
