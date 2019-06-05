import { courtApi } from '../api';
import Request from '../Request';

const get = async () => {
    const url = courtApi;
    
    const req = new Request(url);
    
    return await req.send();
}

export default {
    get,
}
