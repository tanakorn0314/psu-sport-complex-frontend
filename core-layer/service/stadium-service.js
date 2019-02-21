import axios from 'axios';
import { stadiumApi } from '../api/api';

const get = async () => {
    return await axios.get(stadiumApi);
}

export default {
    get,
}
