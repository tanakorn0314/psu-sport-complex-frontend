import { 
    getCookie,
    setCookie,
    removeCookie
} from './session';

const LANGUAGE = 'LANGUAGE';

const TH = 'th';
const EN = 'en';

const setLang = (token) => {
    setCookie(LANGUAGE, token)
};

const getLang = (req = '') => {
    const lang = getCookie(LANGUAGE, req);
    if (!lang || lang === '')
        return EN;
}

export {
    setLang,
    getLang
}