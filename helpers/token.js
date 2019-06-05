import { 
    getCookie,
    setCookie,
    removeCookie
} from './session';
import moment from 'moment';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const EXPIRES = 'EXPIRES';

const isTokenValid = req => {
    const token = getCookie(ACCESS_TOKEN, req);
    const expires = getCookie(EXPIRES, req);
    const now = moment();
    return token && expires && token !== '' && now.isBefore(moment(expires));
}

const setToken = (token) => {setCookie(ACCESS_TOKEN, token)};

const getToken = req => (getCookie(ACCESS_TOKEN, req));

const removeToken = () => {removeCookie(ACCESS_TOKEN)};

const setExpires = (expires) => {setCookie(EXPIRES, expires)};

const getExpires = req => (getCookie(EXPIRES, req));

const removeExpires = () => {removeCookie(EXPIRES)};

export {
    isTokenValid,
    getToken,
    setToken,
    removeToken,
    setExpires,
    getExpires,
    removeExpires
}