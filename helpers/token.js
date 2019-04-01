import { 
    getCookie,
    setCookie,
    removeCookie
} from './session';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const EXPIRES = 'EXPIRES';

// const isTokenValid = req => {
//     const token = getCookie(ACCESS_TOKEN, req);
//     const expires = getCookie(EXPIRES, req);
//     const now = new Date();
//     return token && expires && accessToken !== '' && now < new Date(expires);
// }

const setToken = (token) => {setCookie(ACCESS_TOKEN, token)};

const getToken = req => (getCookie(ACCESS_TOKEN, req));

const removeToken = () => {removeCookie(ACCESS_TOKEN)};

export {
    getToken,
    setToken,
    removeToken
}