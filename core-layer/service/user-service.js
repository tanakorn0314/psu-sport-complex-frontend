import axios from 'axios';
import { userApi } from '../api/api';

const createUser = async (user) => {
    return await axios.post(userApi, user);
}

const get = async () => {
    return await axios.get(userApi);
}

export default {
    createUser,
    get,
}
